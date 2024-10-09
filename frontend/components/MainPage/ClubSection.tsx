// src/components/ClubSection.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../../styles/theme';
import ClubCard from './ClubCard';

const ClubSection = ({ title }) => (
  <View style={styles.container}>
    {title && <Text style={styles.description}>{title}</Text>}
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ClubCard />
      <ClubCard />
      <ClubCard />
      <ClubCard />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.large,
  },
  description: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.medium,
  },
});

export default ClubSection;
