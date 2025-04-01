// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../services/supabase';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) throw error;
      navigation.replace('MainMenu');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-4">
        <View className="items-center mb-6">
          <Image 
            source={require('../assets/uzzap-logo.png')} 
            className="w-40 h-12 mb-4"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-primary">Login to Network</Text>
        </View>
        
        <View className="bg-white p-4 rounded-lg shadow">
          <Text className="text-gray-700 mb-1">Username</Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-3"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            autoCapitalize="none"
          />
          
          <Text className="text-gray-700 mb-1">Password</Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-3"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />

          <Text className="text-gray-700 mb-1">Network access point</Text>
          <Text className="border border-gray-300 rounded p-2 mb-4 text-gray-500">
            (automatic)
          </Text>
          
          <TouchableOpacity
            className={`rounded-md p-3 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white text-center font-bold">
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-primary">Register a New Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text className="text-primary">Forgotten Password</Text>
          </TouchableOpacity>
        </View>
        
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity onPress={() => navigation.navigate('QuickStart')}>
            <Text className="text-primary">Quick Start</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Help')}>
            <Text className="text-primary">Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;