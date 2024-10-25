// contexts/LocationContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
}

interface LocationContextType {
  location: LocationData | null;
  errorMsg: string | null;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  errorMsg: null,
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
          latitude,
          longitude,
          city: address?.city || 'Unknown Location',
        });
      } catch (error) {
        setErrorMsg('Error fetching location data');
      }
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ location, errorMsg }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
