import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserStatusBadge = ({ status }) => {
  const isOnline = status === 'online';

  return (
    <View style={[styles.badge, isOnline ? styles.online : styles.offline]}>
      <Text style={styles.text}>{isOnline ? 'Online' : 'Offline'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  online: {
    backgroundColor: 'green',
  },
  offline: {
    backgroundColor: 'gray',
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});

export default UserStatusBadge;
