import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import TeamEcoCompetition from './TeamEcoCompetition';

interface User {
  id: string;
  name: string;
  avatar: string;
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
};

interface ChallengesContentProps {
  challenges: Challenge[];
  onNewChallenge?: () => void;
}

const ChallengesContent: React.FC<ChallengesContentProps> = ({ 
  challenges,
  onNewChallenge 
}) => {
  return (
    <>
      <Pressable style={styles.newChallengeButton} onPress={onNewChallenge}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.gradientButton}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={styles.newChallengeText}>New Challenge</Text>
        </LinearGradient>
      </Pressable>

      {challenges.map((challenge) => (
        <View key={challenge.id} style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengePrize}>🏆 {challenge.prize}</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${challenge.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{challenge.progress}% Complete</Text>
          </View>

          <View style={styles.participantsRow}>
            <View style={styles.avatarStack}>
              {challenge.participants.map((participant, index) => (
                <Image
                  key={participant.id}
                  source={{ uri: participant.avatar }}
                  style={[
                    styles.participantAvatar,
                    index > 0 && { marginLeft: -16 }
                  ]}
                />
              ))}
            </View>
            <Pressable style={styles.inviteButton}>
              <MaterialIcons name="person-add" size={20} color={COLORS.primary} />
              <Text style={styles.inviteText}>Invite Friends</Text>
            </Pressable>
          </View>
        </View>
      ))}
    <TeamEcoCompetition/>
    </>
  );
};

const styles = StyleSheet.create({
  newChallengeButton: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  newChallengeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  challengeCard: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  challengePrize: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.secondary,
    marginTop: 4,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarStack: {
    flexDirection: 'row',
  },
  participantAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: COLORS.highlight,
  },
  inviteText: {
    color: COLORS.primary,
    fontSize: 14,
    marginLeft: 4,
  },
});

export default ChallengesContent;