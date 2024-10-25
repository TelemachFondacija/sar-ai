import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, { Marker, Heatmap } from 'react-native-maps';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
// Types
interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
}

interface AirQualityData {
  pollution: {
    aqius: number;
    mainus: string;
  };
  weather: {
    tp: number;
    hu: number;
  };
}

interface NearbyAction {
  id: string;
  title: string;
  distance: string;
  impact: number;
}

// Constants
const API_KEY = 'dd53e7d5-f2bf-4dc7-9ce6-e34bb9cbc689';
const COLORS = {
  primary: '#2C4C3B',
  secondary: '#739072',
  accent: '#A0C49D',
  highlight: '#F1F7EE',
  background: '#E5F2E9',
  text: '#1C3829',
  inactive: '#AFC8AD',
  error: '#FF6B6B',
  success: '#4CAF50',
  warning: '#FFA726',
  glass: 'rgba(241, 247, 238, 0.8)',
} as const;

const HomeScreen: React.FC = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [ecoPoints, setEcoPoints] = useState<number>(150);
  const [nearbyActions, setNearbyActions] = useState<NearbyAction[]>([]);
  const [loading, setLoading] = useState(true);

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
        
        // Get city name
        const [address] = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });

        setLocation({
          latitude,
          longitude,
          city: address?.city || 'Unknown Location'
        });

        // Fetch air quality data
        await fetchAirQuality(latitude, longitude);
        
        // Mock nearby actions - replace with actual API call
        fetchNearbyActions(latitude, longitude);
      } catch (error) {
        setErrorMsg('Error fetching location data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fetchAirQuality = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${API_KEY}`
      );
      setAirQuality(response.data.data.current);
    } catch (error) {
      console.error('Error fetching air quality:', error);
      setErrorMsg('Error fetching air quality data');
    }
  };

  const fetchNearbyActions = async (latitude: number, longitude: number) => {
    // Mock data - replace with actual API call
    const mockActions: NearbyAction[] = [
      { id: '1', title: 'Plant a Tree in Central Park', distance: '0.5km', impact: 50 },
      { id: '2', title: 'Join Beach Cleanup', distance: '1.2km', impact: 30 },
      { id: '3', title: 'Local Recycling Drive', distance: '0.8km', impact: 25 },
    ];
    setNearbyActions(mockActions);
  };

  const InfoBox: React.FC<{
    title: string;
    value: string | number;
    subtitle: string;
    icon: string;
    color?: string;
  }> = ({ title, value, subtitle, icon, color }) => (
    <BlurView style={styles.infoBox}>
      <MaterialCommunityIcons
        name={icon as any}
        size={24}
        color={color || COLORS.primary}
        style={styles.icon}
      />
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoSubtitle}>{subtitle}</Text>
    </BlurView>
  );

  const getAirQualityColor = (aqi: number) => {
    if (aqi <= 50) return COLORS.success;
    if (aqi <= 100) return COLORS.warning;
    return COLORS.error;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.highlight, COLORS.background]}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          {/* Location Header */}
          <View style={styles.header}>
            <MaterialCommunityIcons name="map-marker" size={24} color={COLORS.primary} />
            <Text style={styles.locationText}>{location?.city || 'Loading location...'}</Text>
          </View>

          {/* Info Boxes */}
          <View style={styles.infoBoxContainer}>
            <InfoBox
              title="Temperature"
              value={`${airQuality?.weather.tp || '--'}°C`}
              subtitle="Current"
              icon="thermometer"
            />
            <InfoBox
              title="Air Quality"
              value={airQuality?.pollution.aqius || '--'}
              subtitle={airQuality?.pollution.aqius ? 
                airQuality.pollution.aqius <= 50 ? 'Good' :
                airQuality.pollution.aqius <= 100 ? 'Moderate' : 'Poor'
                : 'Unknown'}
              icon="air-filter"
              color={airQuality?.pollution.aqius ? 
                getAirQualityColor(airQuality.pollution.aqius) : 
                COLORS.primary}
            />
            <InfoBox
              title="Eco Points"
              value={ecoPoints}
              subtitle="Your Impact"
              icon="leaf"
              color={COLORS.success}
            />
          </View>

          {/* Map View */}
          {location && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                />
              </MapView>
            </View>
          )}

          {/* Nearby Eco Actions */}
          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>Nearby Eco Actions</Text>
            {nearbyActions.map((action) => (
              <BlurView key={action.id} intensity={30} tint="light" style={styles.actionCard}>
                <View style={styles.actionContent}>
                  <View>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionDistance}>{action.distance}</Text>
                  </View>
                  <View style={styles.impactBadge}>
                    <Text style={styles.impactText}>+{action.impact}</Text>
                  </View>
                </View>
              </BlurView>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif',
  },
  infoBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoBox: {
    flex: 1,
    margin: 4,
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.glass,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  icon: {
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'sans-serif',
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif',
  },
  infoSubtitle: {
    fontSize: 11,
    color: COLORS.inactive,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'sans-serif',
  },
  mapContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  map: {
    flex: 1,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif',
  },
  actionCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.glass,
  },
  actionContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'sans-serif',
  },
  actionDistance: {
    fontSize: 14,
    color: COLORS.inactive,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'sans-serif',
  },
  impactBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  impactText: {
    color: COLORS.background,
    fontWeight: '600',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'sans-serif',
  },
});

export default HomeScreen;