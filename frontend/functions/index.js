const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Function to exchange authorization code for an access token
exports.exchangeCodeForToken = functions.https.onCall(async (data, context) => {
  const {code} = data;

  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated", "User must be authenticated.");
  }

  const userId = context.auth.uid;

  try {
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const authHeader = `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`;

    const tokenResponse = await axios.post(
        tokenUrl,
        new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: REDIRECT_URI,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": authHeader,
          },
        },
    );

    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;
    const expiresIn = tokenResponse.data.expires_in;

    // Store access token and refresh token in Firestore
    const userDocRef = db.collection("users").doc(userId);
    await userDocRef.set(
        {
          spotifyAccessToken: accessToken,
          spotifyRefreshToken: refreshToken,
          spotifyTokenExpiration: Date.now() + expiresIn * 1000,
        },
        {merge: true},
    );

    return {accessToken};
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    throw new functions.https.HttpsError("internal",
        "Failed to exchange authorization code for access token.");
  }
});

// Function to fetch Spotify data and calculate feature percentages
exports.fetchSpotifyData = functions.https.onCall(async (data, context) => {
  const userId = context.auth.uid;

  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated", "User must be authenticated.");
  }

  // Fetch the access token from Firestore
  const userDoc = await db.collection("users").doc(userId).get();
  const userData = userDoc.data();

  if (!userData || !userData.spotifyAccessToken) {
    throw new functions.https.HttpsError(
        "not-found", "No Spotify access token found for this user.");
  }

  const accessToken = userData.spotifyAccessToken;

  // Fetch top 50 tracks and audio features
  const fetchTopTracks = async (token) => {
    const url = "https://api.spotify.com/v1/me/top/tracks?limit=50";
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data.items;
  };

  const fetchAudioFeatures = async (token, trackIds) => {
    const url = `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`;
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data.audio_features;
  };

  const calculateFeaturePercentages = (audioFeatures) => {
    const totalTracks = audioFeatures.length;
    const counts = {
      acoustic: 0,
      danceable: 0,
      instrumental: 0,
      lively: 0,
      speechful: 0,
      energy: 0,
      valence: 0,
    };
    let totalTempo = 0;

    audioFeatures.forEach((features) => {
      if (features.acousticness >= 0.6) counts.acoustic++;
      if (features.danceability >= 0.6) counts.danceable++;
      if (features.instrumentalness >= 0.6) counts.instrumental++;
      if (features.liveness >= 0.6) counts.lively++;
      if (features.speechiness >= 0.6) counts.speechful++;
      if (features.energy >= 0.6) counts.energy++;
      if (features.valence >= 0.6) counts.valence++;
      totalTempo += features.tempo; // Summing up the tempo of each track
    });

    return {
      acoustic: (counts.acoustic / totalTracks) * 100,
      danceable: (counts.danceable / totalTracks) * 100,
      instrumental: (counts.instrumental / totalTracks) * 100,
      lively: (counts.lively / totalTracks) * 100,
      speechful: (counts.speechful / totalTracks) * 100,
      energy: (counts.energy / totalTracks) * 100,
      valence: (counts.valence / totalTracks) * 100,
      averageTempo: totalTempo / totalTracks, // Calculating average tempo
    };
  };

  const calculateTopGenres = async (tracks) => {
    const genreCounts = {};

    for (const track of tracks) {
      for (const artist of track.artists) {
        const artistData = await axios.get(
            `https://api.spotify.com/v1/artists/${artist.id}`,
            {
              headers: {Authorization: `Bearer ${accessToken}`},
            },
        );

        artistData.data.genres.forEach((genre) => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
      }
    }

    const sortedGenres = Object.keys(genreCounts).sort(
        (a, b) => genreCounts[b] - genreCounts[a]);
    return sortedGenres.slice(0, 15); // Top 15 genres
  };

  try {
    const tracks = await fetchTopTracks(accessToken);
    const trackIds = tracks.map((track) => track.id);
    const audioFeatures = await fetchAudioFeatures(accessToken, trackIds);

    const featurePercentages = calculateFeaturePercentages(audioFeatures);
    const topGenres = await calculateTopGenres(tracks);

    // Store the data in Firestore
    const userDocRef = db.collection("users").doc(
        userId).collection("spotifyData");
    await userDocRef.doc("topTracks").set({tracks});
    await userDocRef.doc("audioFeatures").set({audioFeatures});
    await userDocRef.doc("topGenres").set({genres: topGenres});
    await userDocRef.doc("featurePercentages").set({featurePercentages});

    return {topGenres, audioFeatures, featurePercentages};
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    throw new functions.https.HttpsError(
        "internal", "Failed to fetch Spotify data.");
  }
});
