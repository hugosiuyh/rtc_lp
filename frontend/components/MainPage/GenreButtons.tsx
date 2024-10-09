// src/components/GenreButtons.js
import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../../styles/theme';

const genres = ['Techno', 'Hip Hop', 'Rock', 'Alt', 'Techno', 'Techno'];

const GenreButtons = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
    {genres.map((genre, index) => (
      <TouchableOpacity key={index} style={styles.button}>
        <Text style={styles.buttonText}>{genre}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: theme.spacing.medium,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    borderRadius: 20,
    marginRight: theme.spacing.small,
  },
  buttonText: {
    ...globalStyles.text,
    color: theme.colors.text,
  },
});

export default GenreButtons;