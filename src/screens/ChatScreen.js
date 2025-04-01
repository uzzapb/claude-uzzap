// src/screens/ChatScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../services/supabase';

const ChatScreen = ({ route, navigation }) => {
  const { roomId, roomName } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  
  const flatListRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({ title: roomName });
    fetchMessages();
    fetchCurrentUser();
    
    // Set up real-time subscription
    const subscription = supabaseSubscription();
    
    // Join the chat room
    joinChatRoom();
    
    return () => {
      // Clean up subscription and leave chat room on unmount
      subscription.unsubscribe();
      leaveChatRoom();
    };
  }, [roomId]);

  const fetchCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          profiles (
            id,
            username,
            avatar_url
          )
        `)
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOnlineUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('room_participants')
        .select(`
          profiles (
            id,
            username,
            avatar_url
          )
        `)
        .eq('room_id', roomId);
      
      if (error) throw error;
      setOnlineUsers(data?.map(item => item.profiles) || []);
    } catch (error) {
      console.error('Error fetching online users:', error);
    }
  };

  const supabaseSubscription = () => {
    return supabase
      .channel('room:' + roomId)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          handleNewMessage(payload.new);
        }
      )
      .on(
        'presence',
        { event: 'sync' },
        () => {
          fetchOnlineUsers();
        }
      )
      .subscribe();
  };

  const handleNewMessage = async (newMsg) => {
    // Fetch the user profile for the new message
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .eq('id', newMsg.user_id)
        .single();
      
      if (error) throw error;
      
      setMessages(prevMessages => [
        ...prevMessages, 
        { ...newMsg, profiles: data }
      ]);
      
      // Scroll to bottom when new message arrives
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    } catch (error) {
      console.error('Error fetching user for new message:', error);
    }
  };

  const joinChatRoom = async () => {
    if (!user) return;
    
    try {
      await supabase
        .from('room_participants')
        .upsert({
          room_id: roomId,
          user_id: user.id,
          joined_at: new Date().toISOString()
        });
      
      fetchOnlineUsers();
    } catch (error) {
      console.error('Error joining chat room:', error);
    }
  };

  const leaveChatRoom = async () => {
    if (!user) return;
    
    try {
      await supabase
        .from('room_participants')
        .delete()
        .match({
          room_id: roomId,
          user_id: user.id
        });
    } catch (error) {
      console.error('Error leaving chat room:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          room_id: roomId,
          user_id: user.id,
          content: newMessage.trim(),
          created_at: new Date().toISOString()
        });
      
      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = user?.id === item.profiles?.id;
    const messageDate = new Date(item.created_at);
    const formattedTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View className={`flex-row p-2 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
        {!isCurrentUser && (
          <View className="mr-2">
            <Image
              source={
                item.profiles?.avatar_url
                  ? { uri: item.profiles.avatar_url }
                  : require('../assets/default-avatar.png')
              }
              className="w-8 h-8 rounded-full"
            />
          </View>
        )}
        
        <View 
          className={`px-3 py-2 rounded-lg max-w-xs ${
            isCurrentUser 
              ? 'bg-primary rounded-tr-none' 
              : 'bg-gray-200 rounded-tl-none'
          }`}
        >
          {!isCurrentUser && (
            <Text className="text-xs font-bold text-gray-700 mb-1">
              {item.profiles?.username || 'Unknown User'}
            </Text>
)}
<Text className={`${isCurrentUser ? 'text-white' : 'text-gray-800'}`}>
  {item.content}
</Text>
<Text className={`text-xs ${isCurrentUser ? 'text-gray-200' : 'text-gray-500'} text-right mt-1`}>
  {formattedTime}
</Text>
</View>

{isCurrentUser && (
<View className="ml-2">
  <Image
    source={
      user?.avatar_url
        ? { uri: user.avatar_url }
        : require('../assets/default-avatar.png')
    }
    className="w-8 h-8 rounded-full"
  />
</View>
)}
</View>
);
};

const renderSystemMessage = (message, index) => (
<View key={index} className="py-1 px-4 my-1 flex items-center">
<Text className="text-xs text-gray-500 italic">{message}</Text>
</View>
);

return (
<SafeAreaView className="flex-1 bg-white">
<KeyboardAvoidingView
behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
className="flex-1"
>
{loading ? (
<View className="flex-1 justify-center items-center">
  <ActivityIndicator size="large" color="#4CAF50" />
  <Text className="mt-2 text-gray-600">Loading conversation...</Text>
</View>
) : (
<>
  <FlatList
    ref={flatListRef}
    data={messages}
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderMessage}
    contentContainerStyle={{ paddingVertical: 10 }}
    ListEmptyComponent={
      <View className="flex-1 justify-center items-center p-10">
        <Text className="text-gray-500 text-center">
          No messages yet. Be the first to say something!
        </Text>
      </View>
    }
    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
    onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
  />
  
  <View className="p-2 bg-gray-100 border-t border-gray-300 flex-row">
    <TextInput
      className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 mr-2"
      value={newMessage}
      onChangeText={setNewMessage}
      placeholder="Type a message..."
      multiline
    />
    <TouchableOpacity
      className={`justify-center px-4 rounded-lg ${newMessage.trim() ? 'bg-primary' : 'bg-gray-300'}`}
      onPress={sendMessage}
      disabled={!newMessage.trim()}
    >
      <Text className={`font-semibold ${newMessage.trim() ? 'text-white' : 'text-gray-500'}`}>
        Send
      </Text>
    </TouchableOpacity>
  </View>
</>
)}
</KeyboardAvoidingView>
</SafeAreaView>
);
};

export default ChatScreen;