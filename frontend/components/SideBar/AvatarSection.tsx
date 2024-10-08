import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const AvatarSection = () => (
  <View style={styles.container}>
    <Image
      source={require('../../assets/images/profile_photo.png')}
      style={styles.avatar}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: theme.spacing.large,
  },
  avatar: {
    width: '100%', // Limit the logo size to 80% of the logo container
    height: '100%', // Maintain the aspect ratio by matching height to width
    resizeMode: 'contain', // Ensure the logo scales within the container
    borderRadius: 50,
  },
});

export default AvatarSection;