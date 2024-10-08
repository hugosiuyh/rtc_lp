// src/components/Sidebar/TopGenres.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../../styles/theme';

const genres = ['Techno', 'EDM', 'Turkish Pop', 'Turkish Pop', 'Techno'];

const TopGenres = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Top Genres This Month</Text>
    <View style={styles.genreContainer}>
      {genres.map((genre, index) => (
        <View key={index} style={styles.genreItem}>
          <Text style={styles.genreText}>{genre}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.large,
  },
  title: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.medium,
    marginBottom: theme.spacing.medium,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreItem: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: 4,
    margin: 2,
  },
  genreText: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
  },
});

export default TopGenres;