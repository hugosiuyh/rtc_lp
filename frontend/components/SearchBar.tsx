// src/components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../styles/theme';

const SearchBar = () => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search bar name"
      placeholderTextColor={theme.colors.textSecondary}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.medium,
  },
  input: {
    ...globalStyles.text,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 20,
    padding: theme.spacing.medium,
  },
});

export default SearchBar;