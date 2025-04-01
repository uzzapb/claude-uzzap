// src/screens/HelpScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        <View className="items-center mb-6">
          <Image 
            source={require('../assets/uzzap-logo.png')} 
            className="w-40 h-12 mb-4"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-primary">Help & Support</Text>
        </View>
        
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-lg font-bold text-primary mb-3">FAQ</Text>
          
          <Text className="font-bold text-gray-800 mb-1">How do I create an account?</Text>
          <Text className="text-gray-700 mb-3">
            From the login screen, tap on "Register a New Account" and fill in the required information.
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">I forgot my password. What should I do?</Text>
          <Text className="text-gray-700 mb-3">
            On the login screen, tap on "Forgotten Password" and follow the instructions to reset your password.
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">How do I join a chat room?</Text>
          <Text className="text-gray-700 mb-3">
            From the main menu, tap on "Chat" to view all available chat rooms. Tap on any room to join.
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">Can I create my own chat room?</Text>
          <Text className="text-gray-700 mb-3">
            Not at the moment. This feature will be available in a future update.
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">How do I add friends?</Text>
          <Text className="text-gray-700 mb-3">
            From the main menu, tap on "Friends" and then use the search function to find and add friends.
          </Text>
          
          <Text className="font-bold text-gray-800 mb-1">Is my data secure?</Text>
          <Text className="text-gray-700">
            Yes, Uzzap uses industry-standard encryption to protect your data and communications.
          </Text>
        </View>
        
        <View className="bg-white p-4 rounded-lg shadow mb-4">
          <Text className="text-lg font-bold text-primary mb-3">Contact Support</Text>
          <Text className="text-gray-700 mb-3">
            If you need additional help, please reach out to our support team:
          </Text>
          <Text className="text-gray-700">Email: support@uzzap.com</Text>
          <Text className="text-gray-700">Support hours: 9AM - 6PM (UTC)</Text>
        </View>
        
        <TouchableOpacity
          className="bg-primary rounded-md p-3"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-center font-bold">Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpScreen;