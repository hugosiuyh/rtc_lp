import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'; // Add getDoc to fetch the summary
import { db } from '../../firebaseConfig';
import { Dropdown } from 'react-native-element-dropdown';

const VenueScreen: React.FC = () => {
  const [venues, setVenues] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null); // State to hold venue summary
  const [reviews, setReviews] = useState<Array<any>>([]);
  const { width } = Dimensions.get('window');
  const imageSize = width * 0.9;

  useEffect(() => {
    const fetchVenues = async () => {
      const venuesSnapshot = await getDocs(collection(db, 'venues'));
      const venuesData = venuesSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setVenues(venuesData);
    };

    fetchVenues();
  }, []);

  // Fetch reviews and summary from Firestore when a venue is selected
  const fetchReviewsAndSummary = async (venueId: string) => {
    // Fetch the reviews sub-collection
    const reviewsSubCollectionRef = collection(db, `venues/${venueId}/reviews`);
    const reviewsSnapshot = await getDocs(reviewsSubCollectionRef);
    const reviewsData = reviewsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReviews(reviewsData);

    // Fetch the venue summary
    const venueDocRef = doc(db, 'venues', venueId);
    const venueDoc = await getDoc(venueDocRef);
    if (venueDoc.exists()) {
      setSummary(venueDoc.data().summary || 'No summary available.'); // Set the summary or fallback
    } else {
      setSummary('No summary available.');
    }
  };

  const handleVenueChange = (item: { id: string; name: string }) => {
    setSelectedVenue(item.id);
    fetchReviewsAndSummary(item.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Venue</Text>
      <Dropdown
        data={venues}
        labelField="name"
        valueField="id"
        placeholder="Select a venue"
        value={selectedVenue}
        onChange={handleVenueChange}
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        search
      />

      {selectedVenue && summary && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryLabel}>Venue Summary</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>
      )}

      {selectedVenue && reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
              {/* Display the actual review text */}
              <Text style={styles.reviewText}>{item.review_text || 'No review available'}</Text>
              {item.imageUrl && (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={[styles.image, { width: imageSize, height: imageSize * 0.75 }]}
                />
              )}
            </View>
          )}
        />
      ) : (
        selectedVenue && <Text style={styles.noReviewsText}>No reviews found for this venue.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
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
  summaryContainer: {
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 16,
    color: 'black',
  },
  reviewContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  noReviewsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default VenueScreen;
