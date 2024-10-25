import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types'; // Assuming you have defined your route params in this type file

type ReportScreenRouteProp = RouteProp<RootStackParamList, 'Report'>;

export default function Report() {
  const route = useRoute<ReportScreenRouteProp>();
  const { photo } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Report Screen!</Text>
      {photo && (
        <Image
          source={{ uri: photo.uri }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
