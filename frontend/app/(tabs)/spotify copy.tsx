import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { httpsCallable } from 'firebase/functions'; // Firebase functions
import { auth, db, functions } from '../../firebaseConfig'; // Firebase config (initialize Firebase)
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '@env';

WebBrowser.maybeCompleteAuthSession();

// Access environment variables from expo-constants
const CLIENT_ID = SPOTIFY_CLIENT_ID;
const REDIRECT_URI = SPOTIFY_REDIRECT_URI;

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function SpotifyAuth() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['user-read-email', 'user-read-private', 'user-top-read'],
      usePKCE: false,
      redirectUri: REDIRECT_URI,
    },
    discovery
  );

  const [topGenres, setTopGenres] = React.useState([]);
  const [audioFeatures, setAudioFeatures] = React.useState([]);
  const [featurePercentages, setFeaturePercentages] = React.useState(null);
  const [playlistUrl, setPlaylistUrl] = React.useState('');
  const [userDataFetched, setUserDataFetched] = React.useState(false);

  // Check Firestore for existing user data
  const checkUserDataInFirestore = async () => {
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, 'users', user.uid, 'spotifyData', 'topTracks');
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Fetch data from Firestore and set states
        const fetchSpotifyDataFunc = httpsCallable(functions, 'getUserSummary');
        const result = await fetchSpotifyDataFunc();

        setTopGenres(result.data.topGenres.genres);
        setAudioFeatures(result.data.audioFeatures);
        setFeaturePercentages(result.data.featurePercentages);
        setUserDataFetched(true); // Mark data as fetched
      }
    }
  };

  // Handle user authentication and fetching Spotify data
  const handleAuth = async () => {
    if (response?.type === 'success') {
      const { code } = response.params;

      // Send the authorization code to Firebase to exchange for access token
      try {
        const exchangeCodeForTokenFunc = httpsCallable(functions, 'exchangeCodeForToken');
        await exchangeCodeForTokenFunc({ code });

        // Fetch the user's Spotify data (top genres, audio features)
        const fetchSpotifyDataFunc = httpsCallable(functions, 'fetchSpotifyData');
        const result = await fetchSpotifyDataFunc();

        setTopGenres(result.data.topGenres.genres);
        setAudioFeatures(result.data.audioFeatures);
        setFeaturePercentages(result.data.featurePercentages);
        setUserDataFetched(true); // Mark data as fetched
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      }
    }
  };

  // Search functionality for playlist URL
  const handlePlaylistSearch = async () => {
    if (playlistUrl.trim() === '') return;

    try {
      const fetchPlaylistDataFunc = httpsCallable(functions, 'fetchPlaylistData');
      const result = await fetchPlaylistDataFunc({ playlistUrl });

      // Handle playlist data and update state with its audio features
      setAudioFeatures(result.data.audioFeatures);
      setTopGenres(result.data.topGenres);
      setFeaturePercentages(result.data.featurePercentages);
    } catch (error) {
      console.error('Error fetching playlist data:', error);
    }
  };

  // On mount, check if user data already exists in Firestore
  React.useEffect(() => {
    checkUserDataInFirestore();
  }, []);

  return (
    <View style={styles.container}>
      {!userDataFetched && (
        <>
          <Button
            disabled={!request}
            title="Login with Spotify"
            onPress={() => {
              promptAsync();
            }}
          />
          {response?.type === 'success' && (
            <Button title="Fetch Spotify Data" onPress={handleAuth} />
          )}
        </>
      )}

      {userDataFetched && (
        <>
          <Text style={styles.title}>Top 15 Genres</Text>
          {topGenres.length > 0 ? (
            topGenres.map((genre, index) => <Text key={index}>{genre}</Text>)
          ) : (
            <Text>No genres available.</Text>
          )}

          {featurePercentages && (
            <>
              <Text style={styles.title}>Feature Percentages</Text>
              <Text>Acoustic: {featurePercentages.acoustic}%</Text>
              <Text>Danceable: {featurePercentages.danceable}%</Text>
              <Text>Instrumental: {featurePercentages.instrumental}%</Text>
              <Text>Lively: {featurePercentages.lively}%</Text>
              <Text>Speechful: {featurePercentages.speechful}%</Text>
              <Text>Tempo: {featurePercentages.averageTempo}bpm</Text>
              <Text>Energy: {featurePercentages.energy}%</Text>
              <Text>Valence: {featurePercentages.valence}%</Text>
            </>
          )}

          {/* Playlist search box */}
          <TextInput
            style={styles.input}
            placeholder="Paste Spotify Playlist URL"
            value={playlistUrl}
            onChangeText={setPlaylistUrl}
          />
          <Button title="Search Playlist" onPress={handlePlaylistSearch} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});
