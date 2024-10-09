import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, globalStyles } from '../../styles/theme';
import Sidebar from '../../components/SideBar/SideBar';
import MainPage from '../../components/MainPage/MainPage';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Sidebar />
        <MainPage />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    padding: theme.spacing.medium,
  },
  sectionTitle: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.large,
    fontFamily: theme.fonts.bold,
    marginVertical: theme.spacing.medium,
  },
});
