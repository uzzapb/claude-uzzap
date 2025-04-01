import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ChatMessage = ({ message, isCurrentUser }) => {
  return (
    <View style={[styles.container, isCurrentUser ? styles.currentUser : styles.otherUser]}>
      {!isCurrentUser && (
        <Image
          source={
            message.profiles?.avatar_url
              ? { uri: message.profiles.avatar_url }
              : require('../assets/default-avatar.png')
          }
          style={styles.avatar}
        />
      )}
      <View style={styles.messageBox}>
        {!isCurrentUser && <Text style={styles.username}>{message.profiles?.username}</Text>}
        <Text style={styles.message}>{message.content}</Text>
        <Text style={styles.timestamp}>{new Date(message.created_at).toLocaleTimeString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  currentUser: {
    justifyContent: 'flex-end',
  },
  otherUser: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBox: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
    textAlign: 'right',
  },
});

export default ChatMessage;
