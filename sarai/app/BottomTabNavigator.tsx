import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EcoActionsScreen from '../screens/EcoActions/EcoActions';
import ReportScreen from '../screens/Report/Report';
import LeaderboardScreen from '../screens/Leaderboard/Leaderboard';
import ProfileScreen from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="EcoActions" component={EcoActionsScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
