// src/components/ClubCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../styles/theme';

const ClubCard = () => (
  <View style={styles.container}>
    <Text style={styles.time}>TODAY, 9:00PM</Text>
    <Text style={styles.name}>Temple</Text>
    <Image
      source={require('../assets/images/bar.jpeg')}
      style={styles.image}
    />
    <Text style={styles.info}>By Adam Tran, Christian, Shaun</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...globalStyles.card,
    width: 200,
    marginRight: theme.spacing.medium,
  },
  time: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
  name: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.large,
    fontFamily: theme.fonts.bold,
    marginVertical: theme.spacing.small,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: theme.spacing.small,
  },
  info: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
});

export default ClubCard;