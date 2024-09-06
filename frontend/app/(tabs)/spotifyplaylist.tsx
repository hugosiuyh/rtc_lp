import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View, Text, StyleSheet } from 'react-native';
import { httpsCallable } from 'firebase/functions'; // Firebase functions
import { functions } from '../../firebaseConfig'; // Firebase config (initialize Firebase)

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = 'e0b1a29a354d4b6eb6e7dbfb22989d43';
const REDIRECT_URI = 'http://localhost:8081/spotify';

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

        console.log(result)

        setTopGenres(result.data.topGenres);
        setAudioFeatures(result.data.audioFeatures);
        setFeaturePercentages(result.data.featurePercentages);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
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
});
