// src/styles/theme.js
import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    background: '#101010',
    primary: '#FF4A01',
    secondary: '#535353',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    cardBackground: 'rgba(255, 255, 255, 0.1)',
    inputBackground: 'rgba(255, 255, 255, 0.05)',
  },
  fonts: {
    slim: 'Montserrat_Light',
    regular: 'Montserrat_Regular',
    medium: 'System-Medium',
    bold: 'Montserrat_Bold',
  },
  fontSizes: {
    small: 12,
    medium: 14,
    large: 18,
    xlarge: 24,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.medium,
  },
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 8,
    padding: theme.spacing.medium,
  },
});