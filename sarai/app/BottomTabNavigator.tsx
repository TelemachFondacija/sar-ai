import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { Alert, Platform, View } from 'react-native';
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import EcoActionsScreen from '../screens/EcoActions/EcoActions';
import ReportScreen from '../screens/Report/Report';
import LeaderboardScreen from '../screens/Leaderboard/Leaderboard';
import ProfileScreen from '../screens/Profile/Profile';
import useLocation from '../hooks/useLocation';
import Header from '@/components/Header';

const Tab = createBottomTabNavigator();

type BottomTabNavigatorProps = {
  navigation: any; // Replace 'any' with the appropriate navigation type if you have it defined
};

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ navigation }) => {
  const location = useLocation();

  // Function to handle opening the camera or gallery
  const handleReportPress = () => {
    Alert.alert(
      "EcoCam Report",
      "Would you like to take a photo of ecological or enviromental problem?",
      [
        {
          text: "Take Photo",
          onPress: () => {
            launchCamera(
              {
                mediaType: 'photo',
                cameraType: 'back',
                quality: 0.8,
              },
              (response: ImagePickerResponse) => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorCode) {
                  console.error('Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                  // Navigate to the Report Screen with the selected image
                  navigation.navigate("Report", { photo: response.assets[0] });
                }
              }
            );
          },
        },
        {
          text: "Select from Gallery",
          onPress: () => {
            launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 0.8,
              },
              (response: ImagePickerResponse) => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorCode) {
                  console.error('Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                  // Navigate to the Report Screen with the selected image
                  navigation.navigate("Report", { photo: response.assets[0] });
                }
              }
            );
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        header: () => <Header />,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingVertical: 8,
        },
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
          tabBarButton: (props) => (
            <CustomReportButton {...props} onPress={handleReportPress} />
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

// Custom button for the "Report" tab
type CustomReportButtonProps = {
  onPress: () => void;
  children?: React.ReactNode;
};

const CustomReportButton: React.FC<CustomReportButtonProps> = ({ onPress, children, ...props }) => (
  <View {...props}>
    <Feather name="camera" size={24} color="gray" onPress={onPress} />
    {children}
  </View>
);

export default BottomTabNavigator;