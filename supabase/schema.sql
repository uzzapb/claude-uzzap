-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat rooms table
CREATE TABLE chat_rooms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  is_private BOOLEAN DEFAULT FALSE,
  max_users INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create room participants table (for tracking who is in which room)
CREATE TABLE room_participants (
  id SERIAL PRIMARY KEY,
  room_id INTEGER REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(room_id, user_id)
);

-- Create friends table
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL, -- 'pending', 'accepted', 'rejected', 'blocked'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

-- Create some initial chat rooms
INSERT INTO chat_rooms (name, description, category, is_private, max_users)
VALUES
  ('General', 'A general discussion room for everyone', 'IM', FALSE, 200),
  ('Gaming', 'All about video games', 'Games', FALSE, 100),
  ('Music Lovers', 'Share and discuss your favorite music', 'Music', FALSE, 100),
  ('Tech Talk', 'Discussions about technology and gadgets', 'Tech', FALSE, 100),
  ('Sports Zone', 'All sports, all the time', 'Sports', FALSE, 100),
  ('Developers', 'A place for programmers and developers', 'Tech', FALSE, 100),
  ('Movie Buffs', 'Discuss films and cinema', 'Other', FALSE, 100),
  ('Memes', 'Share funny memes and jokes', 'Other', FALSE, 100),
  ('Book Club', 'Talk about your favorite books', 'Other', FALSE, 50),
  ('Photography', 'Share and discuss photography', 'Other', FALSE, 50),
  ('SUPER', 'Elite members only', 'Games', TRUE, 20),
  ('SACRED', 'Special discussions', 'IM', TRUE, 20),
  ('VIP Room', 'Premium members only', 'Other', TRUE, 10);

-- Create RLS (Row Level Security) policies

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Chat rooms policies
CREATE POLICY "Chat rooms are viewable by everyone" 
ON chat_rooms FOR SELECT USING (true);

-- Messages policies
CREATE POLICY "Messages are viewable by everyone" 
ON messages FOR SELECT USING (true);

CREATE POLICY "Users can insert messages" 
ON messages FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Room participants policies
CREATE POLICY "Room participants are viewable by everyone" 
ON room_participants FOR SELECT USING (true);

CREATE POLICY "Users can insert their own room participation" 
ON room_participants FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own room participation" 
ON room_participants FOR DELETE USING (auth.uid() = user_id);

-- Friends policies
CREATE POLICY "Users can view their own friend connections" 
ON friends FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can insert friend requests" 
ON friends FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own friend requests" 
ON friends FOR UPDATE USING (
  auth.uid() = user_id OR auth.uid() = friend_id
);

CREATE POLICY "Users can delete their own friend connections" 
ON friends FOR DELETE USING (
  auth.uid() = user_id OR auth.uid() = friend_id
);

-- Create functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger for friends table
CREATE TRIGGER update_friends_updated_at
BEFORE UPDATE ON friends
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function to handle online users count (could be implemented with Supabase realtime)
CREATE OR REPLACE FUNCTION calculate_online_users()
RETURNS TRIGGER AS $$
BEGIN
  -- Code to update online_users count would go here
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;