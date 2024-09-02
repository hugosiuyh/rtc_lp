import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Dimensions, ScrollView } from 'react-native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../firebaseConfig'; // Ensure firebaseConfig exports initialized Firestore and Storage
import { Dropdown } from 'react-native-element-dropdown'; // Import the Dropdown component
import { Image } from 'expo-image';

const ReviewForm: React.FC = () => {
  const [venues, setVenues] = useState<Array<{ id: string; name: string }>>([]);
  const [promoters, setPromoters] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedPromoter, setSelectedPromoter] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [image, setImage] = useState<null | string>(null);
  const { width } = Dimensions.get('window');
  const imageSize = width * 0.9;

  useEffect(() => {
    const fetchVenues = async () => {
      const venuesSnapshot = await getDocs(collection(db, 'venues'));
      const venuesData = venuesSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setVenues(venuesData);
    };

    const fetchPromoters = async () => {
      const promotersSnapshot = await getDocs(collection(db, 'promoters'));
      const promotersData = promotersSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setPromoters(promotersData);
    };

    fetchVenues();
    fetchPromoters();
  }, []);

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const { assets } = result;
      if (assets && assets.length > 0) {
        setImage(assets[0].uri); // Access the URI from the assets array
      }
    } else {
      console.log('Image picking was cancelled');
    }
  };

  const handleSubmit = async () => {
    if (!selectedVenue || !selectedPromoter || !reviewText) {
      alert("Please fill in all fields");
      return;
    }

    let imageUrl = '';

    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(storage, `images/${selectedVenue}/${Date.now()}`);
      await uploadBytes(imageRef, blob);
      imageUrl = await getDownloadURL(imageRef);
    }

    const reviewDocRef = doc(collection(db, 'reviews'));
    await setDoc(reviewDocRef, {
      venueId: selectedVenue,
      promoterId: selectedPromoter,
      text: reviewText,
      imageUrl,
      timestamp: new Date(),
    });

    alert("Review submitted successfully");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Select Venue</Text>
        <Dropdown
          data={venues}
          labelField="name"
          valueField="id"
          placeholder="Select a venue"
          search
          value={selectedVenue}
          onChange={(item) => setSelectedVenue(item.id)}
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
        />

        <Text style={styles.label}>Select Promoter</Text>
        <Dropdown
          data={promoters}
          labelField="name"
          valueField="id"
          placeholder="Select a promoter"
          value={selectedPromoter}
          search
          onChange={(item) => setSelectedPromoter(item.id)}
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
        />

        <Text style={styles.label}>Write Review</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Write your review here..."
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setReviewText(text)}
          value={reviewText}
        />

        <Button title="Choose Image" onPress={handleChooseImage} />

        {image && <Image source={{ uri: image }} style={[styles.image, { width: imageSize, height: imageSize * 0.75 }]} />}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  textArea: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  dropdown: {
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  dropdownContainer: {
    maxHeight: 200,
  },
  placeholderStyle: {
    color: 'gray',
  },
  selectedTextStyle: {
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default ReviewForm;
