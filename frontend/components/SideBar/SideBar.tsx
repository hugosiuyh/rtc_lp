// src/components/Sidebar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import AvatarSection from './AvatarSection';
import TopGenres from './TopGenres';
import PlaylistInput from './PlaylistInput';
import Header from './Header';

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
    width: '25%', // Fixed width for the sidebar (adjust as necessary)
    backgroundColor: theme.colors.background,
    borderRightWidth: 1,
    borderRightColor: theme.colors.secondary,
  },
});

export default Sidebar;
