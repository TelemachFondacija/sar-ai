import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  RefreshControl,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import LeaderboardContent from '@/components/LeaderboardContent';
import ChallengesContent from '@/components/ChallengesContent';


interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  carbonReduction: number;
  rank: number;
  trend: 'up' | 'down' | 'same';
  isOnline: boolean;
}

interface Challenge {
  id: string;
  title: string;
  participants: User[];
  endDate: string;
  prize: string;
  progress: number;
}

const COLORS = {
  primary: '#2C4C3B',
  secondary: '#739072',
  accent: '#A0C49D',
  highlight: '#F1F7EE',
  background: '#E5F2E9',
  text: '#1C3829',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
  success: '#4CAF50',
  warning: '#FFA726',
  error: '#FF6B6B',
};

const LeaderboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [refreshing, setRefreshing] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Mock data setup
    const mockLeaderboard: User[] = [
      {
        id: '1',
        name: 'Imran Čengić',
        avatar: '/api/placeholder/100/100',
        points: 2430,
        carbonReduction: 156.2,
        rank: 1,
        trend: 'up',
        isOnline: true,
      },
      {
        id: '2',
        name: 'Kerim Šabić',
        avatar: '/api/placeholder/100/100',
        points: 2000,
        carbonReduction: 156.2,
        rank: 2,
        trend: 'up',
        isOnline: true,
      },
      {
        id: '3',
        name: 'Affan Kapidžić',
        avatar: '/api/placeholder/100/100',
        points: 1500,
        carbonReduction: 156.2,
        rank: 3,
        trend: 'up',
        isOnline: true,
      },

      {
        id: '4',
        name: 'Amir Bašić',
        avatar: '/api/placeholder/100/100',
        points: 1400,
        carbonReduction: 120.5,
        rank: 4,
        trend: 'down',
        isOnline: false,
      },
      {
        id: '5',
        name: 'Selma Kovačević',
        avatar: '/api/placeholder/100/100',
        points: 1350,
        carbonReduction: 110.3,
        rank: 5,
        trend: 'up',
        isOnline: true,
      },
      {
        id: '6',
        name: 'Lejla Hadžić',
        avatar: '/api/placeholder/100/100',
        points: 1300,
        carbonReduction: 100.1,
        rank: 6,
        trend: 'same',
        isOnline: false,
      },
      {
        id: '7',
        name: 'Edin Džafić',
        avatar: '/api/placeholder/100/100',
        points: 1250,
        carbonReduction: 95.0,
        rank: 7,
        trend: 'down',
        isOnline: true,
      },
      {
        id: '8',
        name: 'Azra Mujić',
        avatar: '/api/placeholder/100/100',
        points: 1200,
        carbonReduction: 90.5,
        rank: 8,
        trend: 'up',
        isOnline: true,
      },
      {
        id: '9',
        name: 'Jasmin Hasić',
        avatar: '/api/placeholder/100/100',
        points: 1150,
        carbonReduction: 85.3,
        rank: 9,
        trend: 'same',
        isOnline: false,
      },
      {
        id: '10',
        name: 'Mahir Delić',
        avatar: '/api/placeholder/100/100',
        points: 1100,
        carbonReduction: 80.2,
        rank: 10,
        trend: 'up',
        isOnline: true,
      },
      {
        id: '11',
        name: 'Elma Softić',
        avatar: '/api/placeholder/100/100',
        points: 1050,
        carbonReduction: 75.0,
        rank: 11,
        trend: 'down',
        isOnline: false,
      },
      {
        id: '12',
        name: 'Adnan Begić',
        avatar: '/api/placeholder/100/100',
        points: 1000,
        carbonReduction: 70.8,
        rank: 12,
        trend: 'up',
        isOnline: true,
      },
      {
        id: '13',
        name: 'Sara Kukić',
        avatar: '/api/placeholder/100/100',
        points: 950,
        carbonReduction: 68.5,
        rank: 13,
        trend: 'down',
        isOnline: true,
      },
    ];

    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: '30-Day Zero Waste Challenge',
        participants: [mockLeaderboard[0]],
        endDate: '2024-11-25',
        prize: '500 Points',
        progress: 65,
      },
      {
        id: '2',
        title: 'Most Plastic Bottles Collected',
        participants: [mockLeaderboard[1]],
        endDate: '2024-11-25',
        prize: '500 Points',
        progress: 40,
      },
    ];

    setLeaderboardData(mockLeaderboard);
    setActiveChallenges(mockChallenges);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.highlight, COLORS.background]} style={StyleSheet.absoluteFill} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Competition</Text>
        <Pressable style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color={COLORS.primary} />
        </Pressable>
      </View>

      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>
            Leaderboard
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'challenges' && styles.activeTab]}
          onPress={() => setActiveTab('challenges')}
        >
          <Text style={[styles.tabText, activeTab === 'challenges' && styles.activeTabText]}>
            Challenges
          </Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'leaderboard' ? (
          <LeaderboardContent data={leaderboardData} fadeAnim={fadeAnim} />
        ) : (
          <ChallengesContent challenges={activeChallenges} />
        )}
       
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  filterButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.7,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
    opacity: 1,
  },
  content: {
    flex: 1,
  },
});

export default LeaderboardScreen;