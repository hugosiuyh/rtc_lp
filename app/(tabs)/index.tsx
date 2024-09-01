import React, { useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Modal, Linking, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LoginScreen from '@/components/Login'; // Import the LoginScreen component
import { AuthProvider } from '../../context/AuthContext';

const IndexScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <AuthProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.loginButton} onPress={() => setModalVisible(true)}>
          <ThemedText style={styles.loginButtonText}>Login</ThemedText>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchContainer}>
          <Image
            source={require('@/assets/images/bar.jpeg')}
            style={styles.heroImage}
          />
          <View style={styles.overlayContent}>
            <ThemedText type="title" style={styles.searchTitle}>Search for your favorite bar</ThemedText>
            <ThemedText type="subtitle" style={styles.slogan}>Bypass lines with ease</ThemedText>
            <TextInput
              style={styles.searchBox}
              placeholder="Enter bar name"
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <View style={styles.waitlistContainer}>
          <ThemedText type="subtitle" style={styles.waitlistText}>Join our waitlist</ThemedText>
          <TouchableOpacity
            style={styles.waitlistButton}
            onPress={() => Linking.openURL('https://gond9sre4f9.typeform.com/to/hQI7ysPg')}
          >
            <ThemedText style={styles.buttonText}>Sign Up Here</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionsContainer}>
          <Section
            title="For Clubbers"
            description="Skip lines, get personalized recommendations, and enjoy a curated night out."
          />
          <Section
            title="For Bars and Clubs"
            description="Boost revenue, gain insights, and improve your customer experience."
          />
          <Section
            title="How It Works?"
            description="Sign up, explore venues, and enjoy priority access to the best nightlife in town."
          />
        </View>
      </ScrollView>

      {/* Modal for Login */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LoginScreen /> {/* Render the LoginScreen component */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <ThemedText style={styles.buttonText}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    </AuthProvider>
  );
};

const Section: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <ThemedView style={styles.section}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>{title}</ThemedText>
      <ThemedText>{description}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#16213e',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  loginButton: {
    backgroundColor: '#4a4e69',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingTop: 0,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlayContent: {
    alignItems: 'center',
    zIndex: 1,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  slogan: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
  },
  searchBox: {
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#1a1a2e',
  },
  waitlistContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  waitlistText: {
    color: 'white',
  },
  waitlistButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4a4e69',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  section: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    color: 'white',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#4a4e69',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});


export default IndexScreen;

