import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { theme } from '../../styles/theme';

const AvatarSection = () => {
  const { width } = useWindowDimensions(); // Get screen width to calculate adaptive size

  // Calculate the avatar size based on the screen width
  const avatarSize = width * 0.1; // Avatar will be 30% of screen width, adjust as needed

  return (
    <View style={[styles.container]}>
      <Image
        source={require('../../assets/images/profile_photo.png')}
        style={[styles.avatar, { width: avatarSize, height: avatarSize }]} // Set avatar size dynamically
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, 
    width: '100%', // Full width of header
    height: '6%', // Set header height relative to the screen
    // width and height are set dynamically via the avatarSize
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderRightColor: theme.colors.secondary,
    borderTopColor: theme.colors.secondary,
    borderTopWidth: 1,
  },
  avatar: {
    width: 150,
    height: 150,
    resizeMode: 'cover', // Ensure the image covers the given space while maintaining aspect ratio
    borderRadius: 40, // Set borderRadius to a high number to make the image circular, dynamically adjusted
  },
});

export default AvatarSection;
