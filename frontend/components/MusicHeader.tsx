// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../styles/theme';

const Header = () => (
  <View style={styles.container}>
    <Text style={styles.nowPlaying}>NOW PLAYING</Text>
    <Text style={styles.songTitle}>Midnight City - M83</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
  },
  nowPlaying: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
  songTitle: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.bold,
  },
});

export default Header;