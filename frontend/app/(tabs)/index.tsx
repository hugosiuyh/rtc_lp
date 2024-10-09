import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, globalStyles } from '../../styles/theme';
import Sidebar from '../../components/SideBar/SideBar';
import MainPage from '../../components/MainPage/MainPage';
export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Content area with Sidebar and MainPage in a row layout */}
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
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row', // Sidebar and MainPage side-by-side
  },
});
