import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../styles/commonStyles';

export default function Profile() {
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '80%'],
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={require('../../assets/images/profile_placeholder.png')}
            style={styles.profilePicture}
          />
        </View>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.ecoPoints}>Eco Points: 350</Text>
      </View>

      <View style={styles.progressTracker}>
        <Text style={styles.progressText}>Progress to Next Reward</Text>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level 3: Green Advocate</Text>
          <Text style={styles.nextLevelText}>Next Level: Eco Champion (500 Points)</Text>
        </View>
        <View style={styles.badgeContainer}>
          <FontAwesome name="trophy" size={30} color={COLORS.accent} />
          <FontAwesome name="leaf" size={30} color={COLORS.accent} />
          <FontAwesome name="bicycle" size={30} color={COLORS.accent} />
        </View>
      </View>

      <View style={styles.rewardOptions}>
        <Text style={styles.sectionTitle}>Available Rewards</Text>
        <View style={styles.rewardsGrid}>
          <TouchableOpacity style={styles.rewardCard}>
            <Image
              source={require('../../assets/images/reward_placeholder.png')}
              style={styles.rewardImage}
            />
            <Text style={styles.rewardDescription}>10% Off at Green Market</Text>
            <Text style={styles.pointsRequired}>Requires 100 Points</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rewardCard}>
            <Image
              source={require('../../assets/images/reward_placeholder.png')}
              style={styles.rewardImage}
            />
            <Text style={styles.rewardDescription}>Free Public Transit Pass</Text>
            <Text style={styles.pointsRequired}>Requires 200 Points</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.badgeGrid}>
          <View style={styles.badgeItem}>
            <FontAwesome name="trophy" size={40} color={COLORS.accent} />
            <Text style={styles.badgeText}>Eco Hero</Text>
          </View>
          <View style={styles.badgeItem}>
            <FontAwesome name="leaf" size={40} color={COLORS.inactive} />
            <Text style={styles.badgeText}>Green Warrior</Text>
          </View>
          <View style={styles.badgeItem}>
            <FontAwesome name="bicycle" size={40} color={COLORS.inactive} />
            <Text style={styles.badgeText}>Cyclist Champion</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ecoPoints: {
    fontSize: 16,
    color: COLORS.accent,
    marginTop: 5,
  },
  progressTracker: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
  },
  progressBarBackground: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
  },
  levelContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  nextLevelText: {
    fontSize: 14,
    color: COLORS.inactive,
    marginTop: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  rewardOptions: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rewardsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rewardCard: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  rewardImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  rewardDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  pointsRequired: {
    fontSize: 12,
    color: COLORS.inactive,
    marginTop: 5,
  },
  achievementsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  badgeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  badgeItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 12,
    marginTop: 5,
  },
});
