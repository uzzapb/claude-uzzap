// src/screens/ChatRoomsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../services/supabase';

const ChatRoomsScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'IM', 'Games', 'Sports', 'Music', 'Tech', 'Other'];

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = selectedCategory === 'All'
    ? rooms
    : rooms.filter(room => room.category === selectedCategory);

  const renderRoomItem = ({ item }) => {
    // Format the online users count with parentheses
    const userCount = `(${item.online_users}/${item.max_users})`;
    
    return (
      <TouchableOpacity
        className="flex-row items-center p-3 border-b border-gray-200"
        onPress={() => navigation.navigate('Chat', { roomId: item.id, roomName: item.name })}
      >
        <Image 
          source={
            item.is_private 
              ? require('../assets/private-room-icon.png') 
              : require('../assets/public-room-icon.png')
          } 
          className="w-6 h-6 mr-3"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-800">{item.name}</Text>
          <Text className="text-sm text-gray-500">{item.description}</Text>
        </View>
        <Text className="text-xs text-gray-500">{userCount}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row border-b border-gray-200 px-1">
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`px-3 py-2 mr-1 ${selectedCategory === item ? 'bg-primary rounded-t' : ''}`}
              onPress={() => setSelectedCategory(item)}
            >
              <Text 
                className={`font-medium ${selectedCategory === item ? 'text-white' : 'text-gray-700'}`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text className="mt-2 text-gray-600">Loading chat rooms...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRooms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRoomItem}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-10">
              <Text className="text-gray-500 text-center">
                No chat rooms found in this category.
              </Text>
            </View>
          }
        />
      )}
      
      <View className="flex-row justify-between bg-gray-100 p-4 border-t border-gray-300">
        <TouchableOpacity 
          className="bg-primary px-4 py-2 rounded"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-semibold">Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-gray-300 px-4 py-2 rounded"
          onPress={() => fetchChatRooms()}
        >
          <Text className="text-gray-700 font-semibold">Refresh</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomsScreen;