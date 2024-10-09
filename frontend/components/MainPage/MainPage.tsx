import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, globalStyles } from '../../styles/theme';

import SearchBar from './SearchBar';
import GenreButtons from './GenreButtons';
import ClubSection from './ClubSection';
import MusicHeader from './MusicHeader';

export default function MainPage() {
    return (
        <SafeAreaView style={styles.container}>
            <MusicHeader/>
            <View style = {styles.content}>
            <ScrollView style={styles.mainContent}>
                <SearchBar />
                <GenreButtons />
                <Text style={styles.sectionTitle}>Discover Clubs For You</Text>
                <ClubSection title="We feature some of our matching venues in San Francisco. You can also check out some popular spots from the community." />
                <Text style={styles.sectionTitle}>Popular In Your Area</Text>
                <ClubSection />

            </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '70%', // Set the width of the sidebar
        height: '100%', // Full height of the screen or parent container
        backgroundColor: theme.colors.background,
        borderRightWidth: 1,
        borderRightColor: theme.colors.secondary,
        flexDirection: 'column', // Arrange items vertically
        justifyContent: 'space-between', // Pushes content to the top and the button to the bottom
    },
    content: {
        flex: 1,
        padding: '10%',
        justifyContent : 'center',
        },
    mainContent: {
        flex: 1,
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
