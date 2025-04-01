// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChatRoomsScreen from '../screens/ChatRoomsScreen';
import ChatScreen from '../screens/ChatScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import QuickStartScreen from '../screens/QuickStartScreen';
import HelpScreen from '../screens/HelpScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainMenu"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login to Network' }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Register a New Account' }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ title: 'Forgotten Password' }} 
        />
        <Stack.Screen 
          name="QuickStart" 
          component={QuickStartScreen} 
          options={{ title: 'Quick Start' }} 
        />
        <Stack.Screen 
          name="Help" 
          component={HelpScreen} 
          options={{ title: 'Help' }} 
        />
        <Stack.Screen 
          name="MainMenu" 
          component={MainMenuScreen} 
          options={{ title: 'Uzzap', headerLeft: () => null }} 
        />
        <Stack.Screen 
          name="ChatRooms" 
          component={ChatRoomsScreen} 
          options={{ title: 'Chat Rooms' }} 
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={({ route }) => ({ title: route.params.roomName })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;