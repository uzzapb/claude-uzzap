// src/screens/ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../services/supabase';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'uzzap://reset-password',
      });

      if (error) throw error;

      Alert.alert(
        'Password Reset Email Sent',
        'Check your email for a link to reset your password.',
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
      <View className="flex-1 p-4">
        <View className="items-center mb-6">
          <Image 
            source={require('../assets/uzzap-logo.png')} 
            className="w-40 h-12 mb-4"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-primary">Forgot Password</Text>
        </View>
        
        <View className="bg-white p-4 rounded-lg shadow">
          <Text className="text-gray-700 mb-2">
            Please enter your email address to receive a password reset link.
          </Text>
          
          <Text className="text-gray-700 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded p-2 mb-4"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TouchableOpacity
            className={`rounded-md p-3 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text className="text-white text-center font-bold">
              {loading ? 'Sending...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View className="items-center mt-4">
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-primary">Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;