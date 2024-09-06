import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, provider, db } from '../firebaseConfig';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'; // Added getDoc
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  user: any;
  loading: boolean;
  signInWithGoogle: () => void;
  signOutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user from storage", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await AsyncStorage.setItem('user', JSON.stringify(firebaseUser));
      } else {
        setUser(null);
        await AsyncStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;

      // Check if the user document exists
      const userDocRef = doc(db, 'users', loggedInUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create the user document if it doesn't exist
        await setDoc(userDocRef, {
          uid: loggedInUser.uid,
          email: loggedInUser.email,
          displayName: loggedInUser.displayName,
          photoURL: loggedInUser.photoURL,
          phoneNumber: loggedInUser.phoneNumber,
          createdAt: serverTimestamp(), // Store the creation time
          lastLogin: serverTimestamp(), // Store the login time
        });
        console.log('User document created:', loggedInUser.uid);
      } else {
        // Update the last login timestamp if the document already exists
        await setDoc(userDocRef, {
          lastLogin: serverTimestamp(),
        }, { merge: true });
        console.log('User document updated with last login:', loggedInUser.uid);
      }

      setUser(loggedInUser);
      await AsyncStorage.setItem('user', JSON.stringify(loggedInUser));
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOutUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
