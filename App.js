import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome  } from '@expo/vector-icons'; // Thêm icon nếu muốn

// Import các màn hình
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import GalleryScreen from './screens/GalleryScreen';
import StudyScreen from './screens/StudyScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Nếu không cần header
          tabBarActiveTintColor: '#FF6B6B', // Màu cho tên tab khi active
          tabBarInactiveTintColor: '#888',  // Màu cho tên tab khi không active
        }}
      >
        <Tab.Screen
          name="Học từ"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="book" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          }}
        />
        <Tab.Screen
          name="Trò chơi"
          component={GameScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="gamepad" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          }}
        />
        <Tab.Screen
          name="Thư viện"
          component={GalleryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="photo" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          }}
        />
        <Tab.Screen
          name="Cài đặt"
          component={StudyScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cogs" size={size} color={color} />
            ),
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
