import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme, globalStyles } from '../../styles/theme';

export default function MusicHeader() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: screenWidth } = useWindowDimensions(); // Get the screen width dynamically
    const songTitleWidth = screenWidth * 3; // Scroll the width of 3 duplicated song titles

    // Function to start the scroll animation
    const animateScroll = () => {
        scrollX.setValue(0); // Reset position to the start
        Animated.loop(
            Animated.timing(scrollX, {
                toValue: -songTitleWidth, // Scroll the entire width of 3 duplicates
                duration: 30000, // Duration of the scroll (adjust as necessary)
                easing: Easing.linear, // Linear easing for smooth scrolling
                useNativeDriver: true,
            })
        ).start();
    };

    // Start animation once the component mounts
    useEffect(() => {
        animateScroll();
    }, [screenWidth]); // Re-run animation if the screen width changes

    return (
        <View style={styles.songTitleContainer}>
            <Animated.View
                style={[
                    styles.songTitleWrapper,
                    {
                        transform: [
                            {
                                translateX: scrollX, // Animate the translation
                            },
                        ],
                    },
                ]}
            >
                {/* Duplicate the content multiple times for continuous loop */}
                {Array(5).fill(0).map((_, index) => (
                    <Text key={index} style={[styles.songTitle, { width: screenWidth }]}>
                        🎶 Midnight City - M83 🎶
                    </Text>
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    songTitleContainer: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'left', // Align items to the start
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
        fontFamily: theme.fonts.bold,
        textAlign: 'center',
    },
    sectionTitle: {
        ...globalStyles.text,
        fontSize: theme.fontSizes.large,
        fontFamily: theme.fonts.bold,
        marginVertical: theme.spacing.medium,
    },
});
