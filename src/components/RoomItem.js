import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const RoomItem = ({ room, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={
          room.is_private
            ? require('../assets/private-room-icon.png')
            : require('../assets/public-room-icon.png')
        }
        style={styles.icon}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{room.name}</Text>
        <Text style={styles.description}>{room.description}</Text>
      </View>
      <Text style={styles.userCount}>
        ({room.online_users}/{room.max_users})
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  userCount: {
    fontSize: 12,
    color: '#666',
  },
});

export default RoomItem;
