// src/screens/MainMenuScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../services/supabase';

const MainMenuScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const menuItems = [
    {
      id: 'chat',
      title: 'Chat',
      icon: require('../assets/chat-icon.png'),
      onPress: () => navigation.navigate('ChatRooms'),
    },
    {
      id: 'friends',
      title: 'Friends',
      icon: require('../assets/friends-icon.png'),
      onPress: () => Alert.alert('Coming Soon', 'This feature is coming soon!'),
    },
    {
      id: 'music',
      title: 'Music',
      icon: require('../assets/music-icon.png'),
      onPress: () => Alert.alert('Coming Soon', 'This feature is coming soon!'),
    },
    {
      id: 'games',
      title: 'Games',
      icon: require('../assets/games-icon.png'),
      onPress: () => Alert.alert('Coming Soon', 'This feature is coming soon!'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: require('../assets/settings-icon.png'),
      onPress: () => Alert.alert('Coming Soon', 'This feature is coming soon!'),
    },
    {
      id: 'help',
      title: 'Help',
      icon: require('../assets/help-icon.png'),
      onPress: () => navigation.navigate('Help'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-4">
        <View className="items-center mb-6">
          <Image 
            source={require('../assets/uzzap-logo.png')} 
            className="w-40 h-12 mb-2"
            resizeMode="contain"
          />
          <Text className="text-white text-lg">Main Menu - Beta</Text>
        </View>
        
        <View className="flex-1 flex-row flex-wrap justify-center">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-1/3 items-center mb-8"
              onPress={item.onPress}
            >
              <View className="bg-gray-800 w-16 h-16 rounded-lg items-center justify-center mb-2">
                <Image 
                  source={item.icon} 
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-white text-center">{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View className="mt-4 border-t border-gray-700 pt-4">
          <TouchableOpacity
            className="bg-red-700 rounded-md p-3"
            onPress={handleLogout}
          >
            <Text className="text-white text-center font-bold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View className="bg-gray-800 p-4 flex-row justify-around">
        <TouchableOpacity className="items-center" onPress={() => navigation.navigate('ChatRooms')}>
          <Image 
            source={require('../assets/chatrooms-icon.png')} 
            className="w-8 h-8 mb-1"
            resizeMode="contain"
          />
          <Text className="text-white text-xs">Chatrooms</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="items-center" onPress={() => Alert.alert('Coming Soon')}>
          <Image 
            source={require('../assets/buddies-icon.png')} 
            className="w-8 h-8 mb-1"
            resizeMode="contain"
          />
          <Text className="text-white text-xs">Buddies</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MainMenuScreen;