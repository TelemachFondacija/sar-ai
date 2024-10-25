// EcoActivitiesScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';


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
};

interface EcoAction {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

const generateMockActions = (): EcoAction[] => [
  { id: '1', title: 'Tree Planting', description: 'Plant trees to improve air quality.', difficulty: 'Easy', points: 50 },
  { id: '2', title: 'Beach Cleanup', description: 'Help clean the beach to protect marine life.', difficulty: 'Medium', points: 80 },
  { id: '3', title: 'Recycling Workshop', description: 'Learn about recycling techniques.', difficulty: 'Easy', points: 40 },
  { id: '4', title: 'Water Conservation', description: 'Save water for future generations.', difficulty: 'Hard', points: 100 },
  { id: '5', title: 'Energy Saving', description: 'Reduce energy usage.', difficulty: 'Medium', points: 60 },
  { id: '6', title: 'Plant Trees', description: 'Plant trees to reduce carbon.', difficulty: 'Easy', points: 55 },
  { id: '7', title: 'Composting', description: 'Learn composting methods.', difficulty: 'Medium', points: 75 },
  { id: '8', title: 'Bike to Work', description: 'Reduce emissions by biking.', difficulty: 'Hard', points: 120 },
  { id: '9', title: 'Clean River', description: 'Help clean the local river.', difficulty: 'Medium', points: 85 },
  { id: '10', title: 'Solar Panel Setup', description: 'Install solar panels.', difficulty: 'Hard', points: 150 },
];

const EcoActivitiesScreen: React.FC = () => {
  const [actions, setActions] = useState<EcoAction[]>([]);
  const [filteredActions, setFilteredActions] = useState<EcoAction[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    const data = generateMockActions();
    setActions(data);
    setFilteredActions(data);
  }, []);

  const filterByDifficulty = (difficulty: string) => {
    setSelectedFilter(selectedFilter === difficulty ? null : difficulty);
    setFilteredActions(
      selectedFilter === difficulty ? actions : actions.filter(action => action.difficulty === difficulty)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[COLORS.highlight, COLORS.background]} style={StyleSheet.absoluteFill} />

      <Text style={styles.headerText}>Featured Activity</Text>
      {actions[0] && <FeaturedCard action={actions[0]} />}

      <Text style={styles.sectionTitle}>Available Activities</Text>
      <FilterButtons selectedFilter={selectedFilter} onFilterChange={filterByDifficulty} />

      <ScrollView contentContainerStyle={styles.activityList}>
        {filteredActions.map(action => (
          <ActivityCard key={action.id} action={action} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const FeaturedCard: React.FC<{ action: EcoAction }> = ({ action }) => (
  <View style={styles.featuredCard}>
    <MaterialIcons
      name="emoji-events"
      size={24}
      color={'#DDC703'}
      style={styles.trophyIcon}
    />
    <Text style={styles.cardTitle}>{action.title}</Text>
    <Text style={styles.cardDescription}>{action.description}</Text>
    <Text style={styles.cardDetails}>Difficulty: {action.difficulty}</Text>
    <Text style={styles.cardDetails}>Points: {action.points}</Text>
    <Pressable style={styles.joinButton}><Text style={styles.buttonText}>Join Now</Text></Pressable>
  </View>
);

const FilterButtons: React.FC<{ selectedFilter: string | null; onFilterChange: (difficulty: string) => void }> = ({ selectedFilter, onFilterChange }) => (
  <View style={styles.filterContainer}>
    {['Easy', 'Medium', 'Hard'].map(difficulty => (
      <Pressable
        key={difficulty}
        style={[
          styles.filterButton,
          selectedFilter === difficulty && styles.selectedFilterButton,
        ]}
        onPress={() => onFilterChange(difficulty)}
      >
        <Text style={styles.filterButtonText}>{difficulty}</Text>
      </Pressable>
    ))}
  </View>
);

const ActivityCard: React.FC<{ action: EcoAction }> = ({ action }) => (
  <View style={styles.activityCard}>
    <Text style={styles.cardTitle}>{action.title}</Text>
    <Text style={styles.cardDescription}>{action.description}</Text>
    <Text style={styles.cardDetails}>Difficulty: {action.difficulty}</Text>
    <Text style={styles.cardDetails}>Points: {action.points}</Text>
    <Pressable style={styles.joinButton1}><Text style={styles.buttonText}>Join Now</Text></Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  featuredCard: {
    backgroundColor: 'white', 
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5, 
  },
  activityCard: {
    backgroundColor: 'white', 
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4, 
  },
  trophyIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.text,
    marginVertical: 4,
  },
  cardDetails: {
    fontSize: 12,
    color: COLORS.inactive,
    marginVertical: 2,
  },
  joinButton: {
    backgroundColor: '#00A651',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  joinButton1: {
    backgroundColor: '#00A651',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  activityList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  filterButton: {
    backgroundColor: '#00A651',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EcoActivitiesScreen;
