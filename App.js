import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; // Thêm icon nếu muốn
import styles from './global';
import Animated from 'react-native-reanimated';

// Import các màn hình
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import GalleryScreen from './screens/GalleryScreen';
import StudyScreen from './screens/StudyScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    LemonadeStand: require('./assets/fonts/LemonadeStand-J0Ln.ttf'), // Replace with your font file
    Lexend: require('./assets/fonts/Lexend-VariableFont_wght.ttf'), // Replace with your font file
  });
  const [isTabBarVisible, setIsTabBarVisible] = useState(false); // State to toggle tab bar visibility
  // Show a loading indicator while the font is loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: [
              styles.floatingTabBar,
              isTabBarVisible ? styles.tabBarVisible : styles.tabBarHidden, // Toggle visibility
              { backgroundColor: '#333333' }, // Set tab bar background to a less harsh black
            ],
            tabBarActiveTintColor: '#E0E0E0', // Set active text/icon color to a whitish tint
            tabBarInactiveTintColor: '#B0B0B0', // Set inactive text/icon color to a softer white
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          }}
        >
          <Tab.Screen
            name="Học từ"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="book" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Trò chơi"
            component={GameScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="gamepad" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Thư viện"
            component={GalleryScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="photo" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Cài đặt"
            component={StudyScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="cogs" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>

        {/* Floating Button */}
        <TouchableOpacity
          style={[
            styles.floatingButton,
            isTabBarVisible ? { bottom: 100 } : { bottom: 20 }, // Add bottom: 100 if tab bar is visible
          ]}
          onPress={() => setIsTabBarVisible((prev) => !prev)} // Toggle tab bar visibility
        >
          <FontAwesome
            name={isTabBarVisible ? 'eye-slash' : 'eye'} // Change icon based on visibility
            size={24}
            color="#E0E0E0" // Match floating button icon color to whitish tint
          />
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
}