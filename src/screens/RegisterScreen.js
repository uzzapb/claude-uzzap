// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../services/supabase';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Register the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Create a profile for the user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: authData.user.id, 
            username,
            created_at: new Date()
          }
        ]);

      if (profileError) throw profileError;

      Alert.alert(
        'Registration Successful', 
        'Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        <View className="items-center mb-6">
          <Image 
            source={require('../assets/uzzap-logo.png')} 
            className="w-40 h-12 mb-4"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-primary">Register a New Account</Text>
        </View>
        
        <View className="bg-white p-4 rounded-lg shadow">
          <Text className="text-gray-700 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-3"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text className="text-gray-700 mb-1">Username</Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-3"
            value={username}
            onChangeText={setUsername}
            placeholder="Choose a username"
            autoCapitalize="none"
          />
          
          <Text className="text-gray-700 mb-1">Password</Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-3"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
          />
          
          <Text className="text-gray-700 mb-1">Confirm Password</Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-4"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            secureTextEntry
          />
          
          <TouchableOpacity
            className={`rounded-md p-3 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text className="text-white text-center font-bold">
              {loading ? 'Registering...' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View className="items-center mt-4">
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-primary">Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;