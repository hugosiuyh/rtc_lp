import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../../styles/theme';

const PlaylistInput = () => {
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Paste a link to your playlist/"
        placeholderTextColor={theme.colors.textSecondary}
      />
      <Text style={styles.helpText}>
        Add your link above and see what genres you are listening.
      </Text>

      <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
        <Text style={styles.checkboxText}>
          Keep my listener profile and suggest venues based on my listener profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Analysis</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
  },
  checkboxText: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
    marginLeft: theme.spacing.small,
  },
  button: {
    backgroundColor: 'grey',
    borderRadius: 16,
    padding: theme.spacing.small,
    alignItems: 'center',
  },
  buttonText: {
    ...globalStyles.text,
    fontFamily: theme.fonts.regular,
  },
});

export default PlaylistInput;
