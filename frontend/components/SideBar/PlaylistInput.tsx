
// src/components/Sidebar/PlaylistInput.js
import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../../styles/theme';

const PlaylistInput = () => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Paste a link to your playlist/"
      placeholderTextColor={theme.colors.textSecondary}
    />
    <Text style={styles.helpText}>
      Add your link above and see what genres you are listening.
    </Text>
    <TouchableOpacity style={styles.checkbox}>
      <Text style={styles.checkboxText}>
        Keep my listener profile and suggest venues based on my listener profile
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Start Analysis</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.large,
  },
  input: {
    ...globalStyles.text,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 8,
    padding: theme.spacing.small,
    marginBottom: theme.spacing.small,
  },
  helpText: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.medium,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  checkboxText: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
    marginLeft: theme.spacing.small,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: theme.spacing.small,
    alignItems: 'center',
  },
  buttonText: {
    ...globalStyles.text,
    fontFamily: theme.fonts.bold,
  },
});

export default PlaylistInput;