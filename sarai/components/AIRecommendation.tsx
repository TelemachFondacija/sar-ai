import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Types for the component
interface RecommendedAction {
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

const COLORS = {
  primary: '#2C4C3B',
  secondary: '#739072',
  accent: '#A0C49D',
  highlight: '#F1F7EE',
  background: '#E5F2E9',
  text: '#1C3829',
};

const AIEcoRecommendation: React.FC = () => {
  const [recommendation, setRecommendation] = useState<RecommendedAction | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate API call to get recommendation
  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock recommendation data (replace with actual API call later)
        const mockRecommendation: RecommendedAction = {
          name: "Eco-friendly Transportation",
          difficulty: "Medium",
          points: 75
        };
        
        setRecommendation(mockRecommendation);
      } catch (error) {
        console.error('Error fetching recommendation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  const refreshRecommendation = () => {
    setLoading(true);
    // Simulate new recommendation
    setTimeout(() => {
      const newRecommendation: RecommendedAction = {
        name: "Reduce Energy Usage",
        difficulty: "Easy",
        points: 50
      };
      setRecommendation(newRecommendation);
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[COLORS.highlight, COLORS.background]}
          style={styles.gradientBackground}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Getting AI Recommendation...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.highlight, COLORS.background]}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <MaterialIcons name="psychology" size={24} color={COLORS.primary} />
          <Text style={styles.headerText}>AI Recommendation</Text>
        </View>

        <View style={styles.card}>
          <MaterialIcons 
            name="auto-awesome" 
            size={24} 
            color={COLORS.primary}
            style={styles.icon} 
          />
          
          <Text style={styles.title}>{recommendation?.name}</Text>
          
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <MaterialIcons name="fitness-center" size={16} color={COLORS.text} />
              <Text style={styles.detailText}>{recommendation?.difficulty}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="stars" size={16} color={COLORS.text} />
              <Text style={styles.detailText}>{recommendation?.points} pts</Text>
            </View>
          </View>

          <Pressable style={styles.actionButton}>
            <Text style={styles.buttonText}>Start This Action</Text>
          </Pressable>

          <Pressable
            style={styles.refreshButton}
            onPress={refreshRecommendation}
          >
            <MaterialIcons name="refresh" size={16} color={COLORS.text} />
            <Text style={styles.refreshText}>Get New Recommendation</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  gradientBackground: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    color: COLORS.text,
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: '#00A651',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  refreshText: {
    color: COLORS.text,
    marginLeft: 4,
    fontSize: 14,
  },
  loadingText: {
    marginTop: 8,
    color: COLORS.text,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AIEcoRecommendation;