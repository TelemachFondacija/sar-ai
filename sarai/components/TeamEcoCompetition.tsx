import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface TeamStats {
  id: string;
  name: string;
  logo: string;
  points: number;
  members: number;
  treesPlanted: number;
  wasteCollected: number;
  carbonReduced: number;
  weeklyGrowth: number;
}

const COLORS = {
  primary: '#2C4C3B',
  secondary: '#739072',
  background: '#E5F2E9',
  text: '#1C3829',
  burgundy: '#7b1818',
  blue: '#0047AB',
  success: '#4CAF50',
  warning: '#FFA726',
};

const TeamEcoCompetition: React.FC = () => {
  const [teams, setTeams] = useState<TeamStats[]>([
    {
      id: '1',
      name: 'FK Sarajevo',
      logo: '/api/placeholder/100/100', // Replace with actual team logo
      points: 12450,
      members: 1240,
      treesPlanted: 450,
      wasteCollected: 2800,
      carbonReduced: 15600,
      weeklyGrowth: 12,
    },
    {
      id: '2',
      name: 'FK Željezničar',
      logo: '/api/placeholder/100/100', // Replace with actual team logo
      points: 11980,
      members: 1180,
      treesPlanted: 420,
      wasteCollected: 2600,
      carbonReduced: 14800,
      weeklyGrowth: 15,
    },
  ]);

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const scaleAnim = new Animated.Value(1);

  const animateSelection = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
    animateSelection();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Derby Eco Challenge</Text>
      <Text style={styles.subtitle}>Which team's fans make the biggest impact?</Text>

      <View style={styles.versusContainer}>
        {teams.map((team) => (
          <Animated.View
            key={team.id}
            style={[
              styles.teamContainer,
              selectedTeam === team.id && { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Pressable
              style={[
                styles.teamCard,
                selectedTeam === team.id && styles.selectedTeam,
                { backgroundColor: team.id === '1' ? COLORS.burgundy : COLORS.blue },
              ]}
              onPress={() => handleTeamSelect(team.id)}
            >
              <Image source={{ uri: team.logo }} style={styles.teamLogo} />
              <Text style={styles.teamName}>{team.name}</Text>
              <Text style={styles.teamPoints}>{team.points.toLocaleString()} pts</Text>
              
              <View style={styles.statsRow}>
                <MaterialIcons name="group" size={16} color="white" />
                <Text style={styles.statText}>{team.members} fans</Text>
              </View>

              <View style={styles.growthBadge}>
                <MaterialIcons
                  name="trending-up"
                  size={14}
                  color={COLORS.success}
                />
                <Text style={styles.growthText}>+{team.weeklyGrowth}%</Text>
              </View>
            </Pressable>

            <View style={styles.teamStats}>
              <View style={styles.statItem}>
                <MaterialIcons name="park" size={20} color={COLORS.primary} />
                <Text style={styles.statValue}>{team.treesPlanted}</Text>
                <Text style={styles.statLabel}>Trees Planted</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="delete-outline" size={20} color={COLORS.primary} />
                <Text style={styles.statValue}>{team.wasteCollected}kg</Text>
                <Text style={styles.statLabel}>Waste Collected</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="eco" size={20} color={COLORS.primary} />
                <Text style={styles.statValue}>{team.carbonReduced}kg</Text>
                <Text style={styles.statLabel}>CO₂ Reduced</Text>
              </View>
            </View>
          </Animated.View>
        ))}

        <View style={styles.versusCircle}>
          <Text style={styles.versusText}>VS</Text>
        </View>
      </View>

      <Pressable
        style={styles.joinButton}
        onPress={() => {
          if (selectedTeam) {
            console.log(`Joining team: ${selectedTeam}`);
          }
        }}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.gradientButton}
        >
          <Text style={styles.joinButtonText}>
            {selectedTeam ? 'Join Team' : 'Select Your Team'}
          </Text>
        </LinearGradient>
      </Pressable>

      <View style={styles.prizeBanner}>
        <MaterialIcons name="emoji-events" size={24} color={COLORS.warning} />
        <Text style={styles.prizeText}>
          Winning team's fans get special badge and 2x points for next month!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  versusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  teamContainer: {
    flex: 1,
    maxWidth: '45%',
  },
  teamCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedTeam: {
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  teamLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  teamPoints: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: 'white',
    fontSize: 14,
  },
  growthBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 2,
  },
  growthText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
  },
  teamStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  versusCircle: {
    position: 'absolute',
    left: '50%',
    top: '30%',
    marginLeft: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  versusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  joinButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradientButton: {
    padding: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  prizeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  prizeText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
});

export default TeamEcoCompetition;