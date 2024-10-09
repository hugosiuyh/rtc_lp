import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, globalStyles } from '../../styles/theme';

import SearchBar from './SearchBar';
import GenreButtons from './GenreButtons';
import ClubSection from './ClubSection';
import MusicHeader from './MusicHeader';

export default function MainPage() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const screenWidth = Dimensions.get('window').width;
    const songTitleWidth = screenWidth * 3; // Scroll the width of 3 duplicated song titles

    // Function to start the scroll animation
    const animateScroll = () => {
        scrollX.setValue(0); // Reset position to the start
        Animated.loop(
            Animated.timing(scrollX, {
                toValue: -songTitleWidth, // Scroll the entire width of 3 duplicates
                duration: 100000, // Duration of the scroll (adjust as necessary)
                easing: Easing.linear, // Linear easing for smooth scrolling
                useNativeDriver: true,
            }),
        ).start();
    };

    // Start animation once the component mounts
    useEffect(() => {
        animateScroll();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <MusicHeader/>
            <ScrollView style={styles.mainContent}>
                <SearchBar />
                <GenreButtons />
                <Text style={styles.sectionTitle}>Discover Clubs For You</Text>
                <ClubSection title="We feature some of our matching venues in San Francisco. You can also check out some popular spots from the community." />
                <Text style={styles.sectionTitle}>Popular In Your Area</Text>
                <ClubSection />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        flex: 1,
    },
    mainContent: {
        flex: 1,
        padding: '3%'
    },
    songTitleContainer: {
      padding: '3%',
      flexDirection: 'row', // Space items evenly between logo and text
      alignItems: 'center', // Center items vertically
      width: '100%', // Full width of header
      height: '6%', // Set header height relative to the screen
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.secondary,
    },
    songTitleWrapper: {
        flexDirection: 'row', // Layout the song title in a row
        alignItems: 'center',
    },
    songTitle: {
        color: 'white',
        fontSize: 12,
        width: 200,
        fontFamily: theme.fonts.bold, // Set a fixed width for each text
        textAlign: 'center', // Center the text within its container
    },
    sectionTitle: {
        ...globalStyles.text,
        fontSize: theme.fontSizes.large,
        fontFamily: theme.fonts.bold,
        marginVertical: theme.spacing.medium,
    },
});
