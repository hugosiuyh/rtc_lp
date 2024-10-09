import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { theme } from '../../styles/theme';

const AvatarSection = () => {
  const { width, height } = useWindowDimensions(); // Get screen width and height

  // Calculate the avatar size based on the screen width, maintaining aspect ratio
  const avatarSize = width * 0.25; // Adjust as needed, 25% of screen width in this case

  return (
    <View style={[styles.container, { height: height * 0.2 }]}> {/* Dynamic height for container */}
      <Image
        source={require('../../assets/images/profile_photo.png')}
        style={[styles.avatar]} // Dynamic sizing and circular shape
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    resizeMode: 'stretch', // Ensures the image fills the space while maintaining aspect ratio
  },
});

export default AvatarSection;
