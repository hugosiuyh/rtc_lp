import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { theme, globalStyles } from '../../styles/theme';

const Header = () => {
  const { width } = useWindowDimensions(); // Get the width of the screen

  // Set a fixed fontSize for the text (or calculate it dynamically)
  const fontSize = width * 0.02;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo} // Logo size is controlled by the container
        />
      </View>
        <View style={styles.textContainer}>
          <Text
            style={[styles.nowPlaying, { fontSize }]} // Apply dynamic fontSize
            numberOfLines={1} // Ensures the text stays on one line
            ellipsizeMode="tail" // If the text overflows, it will add ellipsis (...)
          >
            ·
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[styles.nowPlaying, { fontSize }]} // Apply dynamic fontSize
            numberOfLines={1} // Ensures the text stays on one line
            ellipsizeMode="tail" // If the text overflows, it will add ellipsis (...)
          >
            NOW PLAYING
          </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '3%',
    flexDirection: 'row',
    justifyContent: 'left', // Space items evenly between logo and text
    alignItems: 'center', // Center items vertically
    width: '100%', // Full width of header
    height: '6%', // Set header height relative to the screen
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
  },
  logoContainer: {
    justifyContent: 'center', // Center logo vertically
    alignItems: 'center', // Center logo horizontally
    width: '10%', // Limit logo container width to 20% of the header width
    height: '100%', // Take up the full height of the header
  },
  logo: {
    width: '100%', // Limit the logo size to 80% of the logo container
    height: '100%', // Maintain the aspect ratio by matching height to width
    resizeMode: 'contain', // Ensure the logo scales within the container
    maxWidth: 50, // Set a maximum width for the logo
    maxHeight: 50, // Set a maximum height for the logo
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    flexShrink: 1, // Allow text container to shrink if necessary
    resizeMode: 'contain'
  },
  nowPlaying: {
    ...globalStyles.text,
    color: 'white',
  },
});

export default Header;
