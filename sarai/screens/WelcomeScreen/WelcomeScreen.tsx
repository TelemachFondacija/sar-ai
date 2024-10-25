import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types'; // Make sure you have this type definition
import { useNavigation } from '@react-navigation/native';

// Define navigation type
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  useEffect(() => {
    // Set a timeout to navigate to Main screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2500);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image source={require('../../assets/images/WelcomeLogo.png')} style={styles.logo} />
      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to EcoBuddy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust the size according to your needs
    height: 150,
    marginBottom: 20, // Adds space between the logo and the text
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
