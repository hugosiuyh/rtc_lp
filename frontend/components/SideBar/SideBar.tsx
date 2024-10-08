import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { theme, globalStyles } from '../../styles/theme';
import AvatarSection from './AvatarSection';
import TopGenres from './TopGenres';
import Header from './Header';
import PlaylistInput from './PlaylistInput';
import { useAuth } from '../../context/AuthContext'; // Adjust the import path accordingly

const Sidebar = () => {

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
  <View style={styles.container}>
    <Header/>
    <View style={styles.content}>
      <AvatarSection />
      <TopGenres />
      <PlaylistInput />
    </View>
    
    {/* Sign Out Button */}
    <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
        <Text style={styles.signOutText}>sign out</Text>
      </TouchableOpacity>
  </View>
);};

const styles = StyleSheet.create({
  container: {
    width: '30%', // Set the width of the sidebar
    height: '100%', // Full height of the screen or parent container
    backgroundColor: theme.colors.background,
    borderRightWidth: 1,
    borderRightColor: theme.colors.secondary,
    flexDirection: 'column', // Arrange items vertically
    justifyContent: 'space-between', // Pushes content to the top and the button to the bottom
  },
  content: {
    justifyContent: 'center',
    flex: 1, // Ensures the content takes up the remaining space above the sign-out button
  },
  signOutButton: {
    paddingVertical: 10, // Add some vertical padding for the button
    paddingHorizontal: 15, // Add some horizontal padding for the button
  },
  signOutText: {
    ...globalStyles.text,
    color: theme.colors.textSecondary, // Text color for the button
    fontSize: 16, // Font size for the text
  },
});

export default Sidebar;
