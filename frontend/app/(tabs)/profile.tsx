import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Header from '@/components/Header'; // Reuse the Header component
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext'; // Adjust the import path accordingly

const ProfileScreen: React.FC = () => {
  console.log('Profile Screen');
  
  const { user, signOutUser } = useAuth();

  // Handler for logout button press
  const handleLogout = async () => {
    try {
      await signOutUser();
      Alert.alert('Logged Out', 'You have been successfully logged out.');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header />
        <Text style={styles.title}>Profile</Text>
        
        {/* Display User Email */}
        {user ? (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.info}>{user.email}</Text>
          </View>
        ) : (
          <Text style={styles.info}>No user data available.</Text>
        )}
        
        {/* Logout Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            color="#ff5c5c" // Optional: Customize button color
          />
        </View>
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
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  info: {
    fontSize: 20,
    marginTop: 5,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default ProfileScreen;
