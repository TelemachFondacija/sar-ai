import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CustomHeaderProps {
    location: string | null; 
  }

const Header: React.FC<CustomHeaderProps> = ({ location }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/images/logo1.webp')} // Replace with the path to your logo image
        style={styles.logo}
      />
      <Text style={styles.locationText}>{location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'green',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 70,
  },
  logo: {
    width: 70,
    height: 70,

  },
  locationText: {
    color: 'white',
    fontSize: 16,
    width: 200
  },
});

export default Header;
