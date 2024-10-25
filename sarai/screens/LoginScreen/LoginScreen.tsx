import React from 'react';
import { Text, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; // Import your types here

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f8',
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Welcome to the Environmental Protection App
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
        Take action to help protect and empower your community in facing environmental challenges.
      </Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('Index')}
      />
    </View>
  );
}
