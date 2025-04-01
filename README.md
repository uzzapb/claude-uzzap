# claude-uzzap# Uzzap Chat App

A modern reimplementation of the classic Uzzap chat application, built with React Native, Expo, NativeWind, and Supabase.

## Features

- User authentication (login, register, password reset)
- Public and private chat rooms
- Real-time messaging
- Online user tracking
- Modern UI inspired by the classic Uzzap

## Tech Stack

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform for React Native
- **NativeWind**: TailwindCSS for React Native
- **Supabase**: Backend as a Service with real-time capabilities
- **React Navigation**: Navigation library for React Native

## Setup Instructions

### 1. Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- Supabase account

### 2. Clone the repository

```bash
git clone <repository-url>
cd uzzap-chat
```

### 3. Install dependencies

```bash
npm install
# or
yarn install
```

### 4. Set up Supabase

1. Create a new Supabase project
2. Run the SQL scripts from `supabase-schema.sql` in the SQL Editor
3. Get your Supabase URL and anon key from the API settings

### 5. Environment setup

Create a `.env` file in the project root:

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Update the `src/services/supabase.js` file with your Supabase credentials.

### 6. Run the app

```bash
npx expo start
```

## Project Structure

```
uzzap-chat/
├── App.js                  # Main application entry point
├── babel.config.js         # Babel configuration
├── package.json            # Package dependencies
├── tailwind.config.js      # TailwindCSS configuration
├── src/
│   ├── assets/             # Images, icons, and other assets
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   ├── screens/            # Screen components
│   ├── services/           # API and service connections
│   └── utils/              # Helper functions and utilities
```

## Usage

1. **Register**: Create a new account
2. **Login**: Sign in with your credentials
3. **Browse Chat Rooms**: Explore available chat rooms
4. **Join Room**: Select a room to start chatting
5. **Send Messages**: Communicate with other users in real-time

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
