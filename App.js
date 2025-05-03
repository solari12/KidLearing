import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  PanResponder,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import styles from './global';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// Import các màn hình
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import GalleryScreen from './screens/GalleryScreen';
import StudyScreen from './screens/StudyScreen';
import HandwritingGameScreen from './screens/HandwritingGameScreen';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');

export default function App() {
  const [fontsLoaded] = useFonts({
    LemonadeStand: require('./assets/fonts/LemonadeStand-J0Ln.ttf'),
    Lexend: require('./assets/fonts/Lexend-VariableFont_wght.ttf'),
  });
  const [isTabBarVisible, setIsTabBarVisible] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false, // Không chiếm quyền ngay từ đầu
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Kích hoạt drag chỉ khi di chuyển đủ xa (> 5px)
      return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
    },
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
    },
    onPanResponderMove: (event, gestureState) => {
      translateX.value = gestureState.dx;
      translateY.value = gestureState.dy;
    },
    onPanResponderRelease: () => {
      translateX.value = withSpring(
        Math.max(0, Math.min(translateX.value, width - 60)),
      );
      translateY.value = withSpring(
        Math.max(0, Math.min(translateY.value, height - 100)),
      );
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const handlePress = () => {
    setIsTabBarVisible((prev) => !prev); // Toggle tab bar trực tiếp
  };

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
              isTabBarVisible ? styles.tabBarVisible : { display: 'none' },
              { backgroundColor: '#333333' },
            ],
            tabBarActiveTintColor: '#E0E0E0',
            tabBarInactiveTintColor: '#B0B0B0',
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
            name="Tập viết"
            component={HandwritingGameScreen}
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
                <FontAwesome name="cogs" size={size} color="#B0B0B0" />
              ),
            }}
          />
        </Tab.Navigator>

        <Animated.View
          style={[
            styles.floatingButton,
            animatedStyle,
            isTabBarVisible ? { bottom: 100 } : { bottom: 20 },
            { zIndex: 1000 },
          ]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity
            onPress={handlePress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={0.7} // Thêm hiệu ứng khi nhấn
          >
            <FontAwesome
              name={isTabBarVisible ? 'eye-slash' : 'eye'}
              size={24}
              color="#E0E0E0"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </NavigationContainer>
  );
}