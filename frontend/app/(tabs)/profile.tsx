import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@/components/Header'; // Reuse the Header component
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
    console.log('Profile Screen')
    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header></Header>
        <Text style={styles.title}>Profile Screen</Text>
        {/* Add more profile information here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
