import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, TextInput, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '../../components/Header'

const IndexScreen: React.FC = () => {
  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Header></Header>
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
    </SafeAreaView>
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
});

export default IndexScreen;
