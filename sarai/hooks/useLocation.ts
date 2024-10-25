// hooks/useLocation.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      // Ask for location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation("Permission denied");
        return;
      }

      // Get the user's current location
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      // Reverse geocode to get city and region
      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (address) {
        setLocation(`${address.city}, ${address.region}`);
      }
    };

    fetchLocation();
  }, []);

  return location;
};

export default useLocation;
    