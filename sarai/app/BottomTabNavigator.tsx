import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EcoActionsScreen from '../screens/EcoActions/EcoActions';
import ReportScreen from '../screens/Report/Report';
import LeaderboardScreen from '../screens/Leaderboard/Leaderboard';
import ProfileScreen from '../screens/Profile/Profile';
import useLocation from '../hooks/useLocation';
import Header from '@/components/Header';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const location = useLocation()
  return (
<Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        header: () => <Header location={location || "Loading..."}/>
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="EcoActions"
        component={EcoActionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
