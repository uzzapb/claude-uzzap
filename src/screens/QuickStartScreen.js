// src/screens/QuickStartScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QuickStartScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        <View className="items-center mb-6">
          <Image 
            source={require('../assets/uzzap-logo.png')} 
            className="w-40 h-12 mb-4"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-primary">Quick Start Guide</Text>
        </View>
        
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-lg font-bold text-primary mb-2">Welcome to Uzzap!</Text>
          <Text className="text-gray-700 mb-3">
            This quick start guide will help you get started with our chat application.
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">Step 1: Create an Account</Text>
          <Text className="text-gray-700 mb-3">
            If you haven't already, tap on "Register a New Account" on the login screen to create your personal Uzzap account.
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">Step 2: Log In</Text>
          <Text className="text-gray-700 mb-3">
            Once your account is created, log in with your username and password.
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">Step 3: Join Chat Rooms</Text>
          <Text className="text-gray-700 mb-3">
            From the main menu, tap on "Chat" to see available chat rooms. Select any room to join the conversation.
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">Step 4: Start Chatting!</Text>
          <Text className="text-gray-700 mb-3">
            Once in a chat room, you can send messages and interact with other users. Have fun!
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">Need More Help?</Text>
          <Text className="text-gray-700">
            Check out our full Help section for detailed information about all Uzzap features.
          </Text>
        </View>
        
        <TouchableOpacity
          className="bg-primary rounded-md p-3 mb-4"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-white text-center font-bold">Go to Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-gray-300 rounded-md p-3"
          onPress={() => navigation.navigate('Help')}
        >
          <Text className="text-gray-700 text-center font-bold">View Full Help</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuickStartScreen;