import React, { useEffect, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types'; // Ensure you have this type definition
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, commonStyles } from '../../styles/commonStyles'; // Import the common styles

// Define navigation type
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  // Animated value for scaling the logo
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Set a timeout to navigate to Main screen after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2000);

    // Start the animation for pulsing effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigation, scaleAnim]);

  return (
    <LinearGradient colors={[COLORS.highlight, COLORS.background]} style={commonStyles.gradient}>
      <ScrollView contentContainerStyle={[commonStyles.scrollView, commonStyles.centered]}>
        {/* Animated Logo Image */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Image source={require('../../assets/images/WelcomeLogo.png')} style={styles.logo} resizeMode="contain" />
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200, // Adjust the size according to your needs
    height: 200,
    marginBottom: 20, // Adds space between the logo and the text
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    fontSize: 30,
    color: COLORS.primary,
    marginHorizontal: 2,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
