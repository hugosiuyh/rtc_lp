// src/components/Sidebar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../../styles/theme';
import AvatarSection from './AvatarSection';
import TopGenres from './TopGenres';
import PlaylistInput from './PlaylistInput';
import Header from './Header'

const Sidebar = () => (
  <View style={styles.container}>
    <Header />
    <AvatarSection />
    <TopGenres />
    <PlaylistInput />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '30%',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    borderRightWidth: 1,
    borderRightColor: theme.colors.secondary,
  },
});

export default Sidebar;

// Implement AvatarSection, TopGenres, and PlaylistInput components separately