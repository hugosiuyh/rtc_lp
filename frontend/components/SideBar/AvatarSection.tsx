// src/components/Sidebar/AvatarSection.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const AvatarSection = () => (
  <View style={styles.container}>
    <Image
      source={require('../../assets/images/favicon.png')}
      style={styles.avatar}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default AvatarSection;