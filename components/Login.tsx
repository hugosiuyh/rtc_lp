import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext setup

const LoginScreen: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign in with email</Text>

      <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Sign in with Link</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>No password setup required. We'll email you a sign-in link which will redirect you back to this page.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#4a4e69',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  orText: {
    color: '#555',
    fontSize: 14,
    marginVertical: 20,
  },
  linkButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#4a4e69',
    borderWidth: 1,
    marginBottom: 10,
  },
  linkButtonText: {
    color: '#4a4e69',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
