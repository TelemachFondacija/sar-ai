import React from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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
  error: '#FF6B6B',
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return COLORS.gold;
    case 2: return COLORS.silver;
    case 3: return COLORS.bronze;
    default: return COLORS.text;
  }
};

const getTrendIcon = (trend: 'up' | 'down' | 'same') => {
  switch (trend) {
    case 'up': return 'trending-up';
    case 'down': return 'trending-down';
    default: return 'trending-flat';
  }
};

const getTrendColor = (trend: 'up' | 'down' | 'same') => {
  switch (trend) {
    case 'up': return COLORS.success;
    case 'down': return COLORS.error;
    default: return COLORS.text;
  }
};

interface LeaderboardContentProps {
  data: User[];
  fadeAnim: Animated.Value;
}

const LeaderboardContent: React.FC<LeaderboardContentProps> = ({ data, fadeAnim }) => {
  const topThree = data.slice(0, 3);
  const hardcodedUsers = [
    { id: '1', name: 'User1', points: 1000 },
    { id: '2', name: 'User2', points: 900},
    { id: '3', name: 'User3', points: 850},
    { id: '4', name: 'User4', points: 800},
    { id: '5', name: 'User5', points: 750},
    { id: '6', name: 'User6', points: 700},
    { id: '7', name: 'User7', points: 650},
    { id: '8', name: 'User8', points: 600},
    { id: '9', name: 'User9', points: 550},
    { id: '10', name: 'User10', points: 500},
  ];
  
  return (
    <>
      <View style={styles.highlightSection}>
        <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.topRankers}>
          {topThree.map((user, index) => (
            <View key={user.id} style={styles.topRanker}>
              <MaterialIcons
                name="emoji-events"
                size={24}
                color={getRankColor(index + 1)}
                style={styles.trophyIcon}
              />
              <Image source={{ uri: user.avatar }} style={styles.topRankerAvatar} />
              <Text style={styles.topRankerName}>{user.name}</Text>
              <Text style={styles.topRankerPoints}>{user.points} pts</Text>
            </View>
          ))}
        </LinearGradient>
      </View>
      <View style={styles.userList}>
        {hardcodedUsers.map((user) => (
          <View key={user.id} style={styles.userRow}>
            <Text style={styles.userName1}>{user.name}</Text>
            <Text style={styles.userPoints}>{user.points} pts</Text>
          </View>
        ))}
      </View>


      {data.map((user) => (
        <Animated.View key={user.id} style={[styles.leaderboardCard, { opacity: fadeAnim }]}>
          <Text style={[styles.rankText, { color: getRankColor(user.rank) }]}>#{user.rank}</Text>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.carbonText}>{user.carbonReduction}kg CO₂ saved</Text>
          </View>
          <Text style={styles.points}>{user.points} pts</Text>
          <MaterialIcons
            name={getTrendIcon(user.trend)}
            size={20}
            color={getTrendColor(user.trend)}
          />
        </Animated.View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  highlightSection: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  topRankers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  topRanker: {
    alignItems: 'center',
  },
  trophyIcon: {
    marginBottom: 4,
  },
  topRankerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  topRankerName: {
    color: 'white',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  topRankerPoints: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  leaderboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rankText: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  carbonText: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 8,
  },
  userList: { marginTop: 16, marginHorizontal: 18 },
  userRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  userAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  userName1: { fontSize: 16, fontWeight: '600', flex: 1, color: COLORS.primary},
  userPoints: { fontSize: 16, fontWeight: '600', color: COLORS.primary},
});

export default LeaderboardContent;