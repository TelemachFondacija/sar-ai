import React from 'react';
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function Leaderboard() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Top Section: Challenge Others Button */}
      <View style={{ marginBottom: 20 }}>
        <Button title="Challenge a Friend" onPress={() => {/* Trigger challenge functionality */}} />
      </View>

      {/* Ongoing Competitions Section */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Ongoing Competitions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {[1, 2, 3].map((comp, index) => (
          <View key={index} style={{ padding: 10, marginRight: 10, backgroundColor: '#e0e0e0', borderRadius: 10 }}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Opponent Name</Text>
            <Text>Time Remaining: 3d 4h</Text>
            <Text>Current Score: 150 vs 140</Text>
          </View>
        ))}
      </ScrollView>

      {/* Create or Join Competitions Section */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Create or Join Competitions</Text>
      <View style={{ marginBottom: 20 }}>
        <Button title="Create a Custom Challenge" onPress={() => {/* Trigger create challenge functionality */}} />
        <View style={{ marginTop: 10 }}>
          <Button title="Join an Open Competition" onPress={() => {/* Trigger join competition functionality */}} />
        </View>
      </View>

      {/* Completed Competitions and Rankings */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Completed Competitions</Text>
      {[1, 2, 3].map((comp, index) => (
        <View key={index} style={{ padding: 10, marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Competition #{index + 1}</Text>
          <Text>Final Score: 200 vs 180</Text>
          <Text>Winner: You!</Text>
        </View>
      ))}

      {/* Competition Leaderboard */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Top Competitors</Text>
      {[1, 2, 3, 4, 5].map((user, index) => (
        <View key={index} style={{ padding: 10, marginBottom: 10, backgroundColor: '#e8e8e8', borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>User #{index + 1}</Text>
          <Text>Competitions Won: {index * 2}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  challengeButton: {
    backgroundColor: '#00ff00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
};
