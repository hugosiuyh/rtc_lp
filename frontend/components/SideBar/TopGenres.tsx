// import React, { useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Animated } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { theme, globalStyles } from '../../styles/theme';

// const genres = ['Techno', 'EDM', 'Turkish Pop', 'Techno', 'Hip-Hop'];

// const TopGenres = () => {
//   const animatedValue = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Loop the animation to slide gradient
//     Animated.loop(
//       Animated.timing(animatedValue, {
//         toValue: 1,
//         duration: 4000, // Duration of the gradient transition
//         useNativeDriver: false,
//       })
//     ).start();
//   }, [animatedValue]);

//   // Interpolate translateX value to create sliding effect
//   const translateX = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['-100%', '0%'], // Slide from -100% to 0% for continuous loop
//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Top Genres This Month</Text>
//       <View style={styles.genreContainer}>
//         {genres.map((genre, index) => (
//           <View key={index} style={styles.genreItem}>
//             <View style={styles.gradientContainer}>
//               <Animated.View
//                 style={[
//                   StyleSheet.absoluteFill, // Fill the container
//                   { transform: [{ translateX }] },
//                 ]}
//               >
//                 <LinearGradient
//                   // Extend the gradient with multiple iterations of the colors
//                   colors={['#00D4FF', '#FF7518', '#FF4500', '#00D4FF', '#FF7518', '#FF4500']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.gradient}
//                 />
//               </Animated.View>
//             </View>
//             <Text style={styles.genreText}>{genre}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: theme.spacing.large,
//   },
//   title: {
//     ...globalStyles.text,
//     fontSize: theme.fontSizes.medium,
//     fontFamily: theme.fonts.regular,
//     marginBottom: theme.spacing.medium,
//   },
//   genreContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   genreItem: {
//     borderRadius: 20,
//     margin: 4,
//     width: 120, // Fixed width for the genre item
//     height: 50, // Set a fixed height
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden', // Ensure gradient stays within the bounds
//   },
//   gradientContainer: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   gradient: {
//     width: '300%', // Make the gradient three times as wide to ensure multiple iterations of the colors
//     height: '100%',
//   },
//   genreText: {
//     ...globalStyles.text,
//     fontSize: theme.fontSizes.small,
//     fontFamily: theme.fonts.bold,
//     color: 'black',
//     position: 'absolute',
//   },
// });

// export default TopGenres;

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme, globalStyles } from '../../styles/theme';
import { Easing } from 'react-native';

const genres = ['Techno', 'EDM', 'Turkish Pop', 'Techno', 'Hip-Hop'];

const TopGenres = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Loop the animation to slide gradient continuously
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 6000, // Adjust the duration for a smoother, slower transition
        easing: Easing.linear, // Linear easing for a smooth transition
        useNativeDriver: false,
      })
    ).start();
  }, [animatedValue]);

  // Interpolate translateX value to create smooth sliding effect
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-200%', '0%'], // Slide from -200% to 0% for continuous, smooth loop
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Genres This Month</Text>
      <View style={styles.genreContainer}>
        {genres.map((genre, index) => (
          <View key={index} style={styles.genreItem}>
            <View style={styles.gradientContainer}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFill, // Fill the container
                  { transform: [{ translateX }] }, // Move the gradient smoothly
                ]}
              >
                <LinearGradient
                  // Extended the gradient with multiple iterations of the colors
                  colors={['#00D4FF', '#FF7518', '#FF4500', '#00D4FF', '#FF7518', '#FF4500','#00D4FF']}
                  start={{ x: 0, y: 2 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                />
              </Animated.View>
            </View>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.large,
  },
  title: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.medium,
    fontFamily: theme.fonts.regular,
    marginBottom: theme.spacing.medium,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreItem: {
    borderRadius: 20,
    margin: 4,
    paddingHorizontal: 12,
    paddingVertical: 8, 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradient: {
    width: '400%', 
    height: '100%',
  },
  genreText: {
    ...globalStyles.text,
    fontSize: theme.fontSizes.small,
    fontFamily: theme.fonts.regular,
    color: 'black',
    zIndex: 1,
  },
});

export default TopGenres;
