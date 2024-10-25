// Header.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface LocationData {
  city?: string;
}

const Header: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const [address] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        setLocation({
          city: address?.city || 'Unknown Location',
        });
      } catch (error) {
        setErrorMsg('Error fetching location data');
      }
    })();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode='contain'
      />
      <View style={styles.locationContainer}>
        <MaterialCommunityIcons name="map-marker" size={20} color="grey" />
        <Text style={styles.locationText}>
          {errorMsg || location?.city || 'Loading location...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F7EE',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 80,
  },
  logo: {
    width: 70,
    height: 70,
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  locationText: {
    color: 'grey',
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'right',
  },
});

export default Header;
