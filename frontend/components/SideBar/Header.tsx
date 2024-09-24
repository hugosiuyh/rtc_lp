// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, globalStyles } from '../../styles/theme';

const Header = () => (
  <View style={styles.container}>
    <Text style={styles.nowPlaying}>NOW PLAYING</Text>
    <Text style={styles.songTitle}>Midnight City - M83</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
  },
  nowPlaying: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
    color: theme.colors.textSecondary,
  },
  songTitle: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.bold,
  },
});

export default Header;

// import React, { useState, useEffect } from 'react';
// import { View, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
// import { useAuth } from '../context/AuthContext';
// import { ThemedText } from '@/components/ThemedText';
// import { useRouter } from 'expo-router';
// import LoginScreen from '@/components/Login';

// const Header: React.FC = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isRouterReady, setIsRouterReady] = useState(false);

//   useEffect(() => {
//     if (router) {
//       setIsRouterReady(true);
//     }
//   }, [router]);

//   const handlePress = () => {
//     if (isRouterReady) {
//       console.log('Navigating to profile');
//       router.push('/(tabs)/profile');
//     }
//   };

//   return (
//     <View>
//       <View style={styles.header}>
//         <Image
//           source={require('@/assets/images/logo.png')}
//           style={styles.logo}
//         />
//         {user ? (
//           <TouchableOpacity
//             style={styles.profileButton}
//             onPress={handlePress} // Navigate to the profile screen
//           >
//             <ThemedText style={styles.profileButtonText}>Profile</ThemedText>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity
//             style={styles.loginButton}
//             onPress={() => setModalVisible(true)} // Open the login modal
//           >
//             <ThemedText style={styles.loginButtonText}>Login</ThemedText>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Modal for Login */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <LoginScreen setModalVisible={setModalVisible} /> {/* Pass setModalVisible as a prop */}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <ThemedText style={styles.buttonText}>Close</ThemedText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#16213e',
//   },
//   logo: {
//     width: 120,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   loginButton: {
//     backgroundColor: '#4a4e69',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   loginButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   profileButton: {
//     backgroundColor: '#4a4e69',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   profileButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   // Modal styles
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   closeButton: {
//     backgroundColor: '#4a4e69',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default Header;
