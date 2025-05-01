import { Animated } from 'react-native';

// Floating animation
export const startFloatingAnimation = (animationValue) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: -10, // Move up by 10 pixels
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 0, // Move back to the original position
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();
};

// Trembling animation
export const startTrembleAnimation = (animationValue) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: 2, // Move 5 pixels to the right
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: -2, // Move 5 pixels to the left
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 0, // Return to the original position
        duration: 100,
        useNativeDriver: true,
      }),
    ])
  ).start();
};

// Stop trembling animation
export const stopAnimation = (animationValue) => {
  animationValue.stopAnimation(); // Stop the animation
  animationValue.setValue(0); // Reset the position
};

export const letterPop = (animationValue) => {
  Animated.timing(animationValue, {
    toValue: -10, // Move up by 10 pixels
    duration: 300,
    useNativeDriver: true,
  }).start();
}

export const letterPopOut = (animationValue) => {
  Animated.timing(animationValue, {
    toValue: 0, // Return to the original position
    duration: 300,
    useNativeDriver: true,
  }).start();
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomBrightColor = () => {
  const getBrightValue = () => Math.floor(Math.random() * 156) + 100; // Ensure values are between 100 and 255
  const r = getBrightValue();
  const g = getBrightValue();
  const b = getBrightValue();
  return `rgb(${r}, ${g}, ${b})`; // Return the color in RGB format
};