import React, { useState, useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
const alphabet = require('../assets/data/alphabet.json');
const numbers = require('../assets/data/numbers.json');
const shapes = require('../assets/data/shapes.json');
const colors = require('../assets/data/colors.json');
import styles from '../global';
import { FontAwesome } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

// Màn hình chính
export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'alphabet':
        return <AlphabetScreen onBack={() => setCurrentScreen('home')} />;
      case 'numbers':
        return <NumbersScreen onBack={() => setCurrentScreen('home')} />;
      case 'shapes':
        return <ShapesScreen onBack={() => setCurrentScreen('home')} />;
      case 'colors':
        return <ColorsScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      {currentScreen !== 'home' && (<TouchableOpacity
        onPress={() => setCurrentScreen('home')}
        style={[
          styles.floatingButton,
          { bottom: null, top: 50, zIndex: 999 }, // Add bottom: 100 if tab bar is visible
        ]}
      >
        <FontAwesome name="angle-left" size={26} color="#E0E0E0" />
      </TouchableOpacity>)}
      {renderScreen()}
    </SafeAreaView>
  );
}

// Màn hình chính với các lựa chọn học tập
function Home({ onNavigate }) {
  const floatAnimation = useRef(new Animated.Value(0)).current;

  // Create separate trembling animations for each button
  const trembleAlphabet = useRef(new Animated.Value(0)).current;
  const trembleNumbers = useRef(new Animated.Value(0)).current;
  const trembleShapes = useRef(new Animated.Value(0)).current;
  const trembleColors = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: -10, // Move up by 10 pixels
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0, // Move back to the original position
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnimation]);

  const startTremble = (trembleAnimation) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(trembleAnimation, {
          toValue: 5, // Move 5 pixels to the right
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(trembleAnimation, {
          toValue: -5, // Move 5 pixels to the left
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(trembleAnimation, {
          toValue: 0, // Return to the original position
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopTremble = (trembleAnimation) => {
    trembleAnimation.stopAnimation(); // Stop the trembling animation
    trembleAnimation.setValue(0); // Reset the position
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuGrid}>
        {/* Alphabet Button */}
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? 'rgba(255, 76, 76, 0.8)' : 'rgba(255, 76, 76, 1)' },
          ]}
          onPress={() => onNavigate('alphabet')}
          onPressIn={() => startTremble(trembleAlphabet)} // Start trembling for this button
          onPressOut={() => stopTremble(trembleAlphabet)} // Stop trembling for this button
        >
          <ImageBackground
            source={require('../assets/images/alphabet-bg.jpg')}
            style={styles.menuItemBackground}
            imageStyle={{ opacity: 0.2 }}
          >
            <Animated.Text
              style={[
                styles.menuText,
                {
                  transform: [
                    { translateY: floatAnimation }, // Apply floating animation
                    { translateX: trembleAlphabet }, // Apply trembling animation
                  ],
                },
              ]}
            >
              Chữ Cái
            </Animated.Text>
          </ImageBackground>
        </Pressable>

        {/* Numbers Button */}
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? 'rgba(160, 155, 240, 0.8)' : 'rgba(160, 155, 255, 1.0)' },
          ]}
          onPress={() => onNavigate('numbers')}
          onPressIn={() => startTremble(trembleNumbers)} // Start trembling for this button
          onPressOut={() => stopTremble(trembleNumbers)} // Stop trembling for this button
        >
          <ImageBackground
            source={require('../assets/images/numbers-bg.jpg')}
            style={styles.menuItemBackground}
            imageStyle={{ opacity: 0.2 }}
          >
            <Animated.Text
              style={[
                styles.menuText,
                {
                  transform: [
                    { translateY: floatAnimation }, // Apply floating animation
                    { translateX: trembleNumbers }, // Apply trembling animation
                  ],
                },
              ]}
            >
              Số
            </Animated.Text>
          </ImageBackground>
        </Pressable>

        {/* Shapes Button */}
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? 'rgba(125, 191, 138, 0.8)' : 'rgba(125, 191, 138, 1)' },
          ]}
          onPress={() => onNavigate('shapes')}
          onPressIn={() => startTremble(trembleShapes)} // Start trembling for this button
          onPressOut={() => stopTremble(trembleShapes)} // Stop trembling for this button
        >
          <ImageBackground
            source={require('../assets/images/shapes-bg.jpg')}
            style={styles.menuItemBackground}
            imageStyle={{ opacity: 0.2 }}
          >
            <Animated.Text
              style={[
                styles.menuText,
                {
                  transform: [
                    { translateY: floatAnimation }, // Apply floating animation
                    { translateX: trembleShapes }, // Apply trembling animation
                  ],
                },
              ]}
            >
              Hình Dạng
            </Animated.Text>
          </ImageBackground>
        </Pressable>

        {/* Colors Button */}
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? 'rgba(255, 24, 132, 0.5)' : 'transparent' },
          ]}
          onPress={() => onNavigate('colors')}
          onPressIn={() => startTremble(trembleColors)} // Start trembling for this button
          onPressOut={() => stopTremble(trembleColors)} // Stop trembling for this button
        >
          <ImageBackground
            source={require('../assets/images/colors-bg.jpg')}
            style={styles.menuItemBackground}
            imageStyle={{ opacity: 0.8 }}
          >
            <Animated.Text
              style={[
                styles.menuText,
                {
                  transform: [
                    { translateY: floatAnimation }, // Apply floating animation
                    { translateX: trembleColors }, // Apply trembling animation
                  ],
                },
              ]}
            >
              Màu Sắc
            </Animated.Text>
          </ImageBackground>
        </Pressable>
      </View>
    </View>
  );
}

// Màn hình học bảng chữ cái
function AlphabetScreen({ onBack }) {
  const [selectedLetter, setSelectedLetter] = useState(null);

  return (
    <View style={styles.screen}>
      {selectedLetter ? (
        <View style={styles.letterDetail}>
          <Text style={styles.bigLetter}>{selectedLetter.letter}</Text>
          <Text style={styles.letterWord}>{selectedLetter.word}</Text>
          <Text style={styles.letterPronoun}>{selectedLetter.pronoun}</Text>
          <TouchableOpacity
            style={styles.backToListButton}
            onPress={() => setSelectedLetter(null)}
          >
            <Text style={styles.backToListText}>Xem tất cả chữ cái</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.alphabetGrid}>
          {alphabet.map((item) => (
            <TouchableOpacity
              key={item.letter}
              style={styles.letterItem}
              onPress={() => {
                setSelectedLetter(item);
              }}
            >
              <Text style={styles.letterText}>{item.letter}</Text>
              <Text style={styles.wordHint}>{item.word}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// Màn hình học số đếm
function NumbersScreen({ onBack }) {
  const [selectedNumber, setSelectedNumber] = useState(null);

  return (
    <View style={styles.screen}>
      {selectedNumber ? (
        <View style={styles.numberDetail}>
          <Text style={styles.bigNumber}>{selectedNumber.number}</Text>
          <Text style={styles.numberWord}>{selectedNumber.word}</Text>
          <Text style={styles.numberExample}>{selectedNumber.example}</Text>
          <TouchableOpacity
            style={styles.backToListButton}
            onPress={() => setSelectedNumber(null)}
          >
            <Text style={styles.backToListText}>Xem tất cả số</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.numbersGrid}>
          {numbers.map((item) => (
            <TouchableOpacity
              key={item.number}
              style={styles.numberItem}
              onPress={() => setSelectedNumber(item)}
            >
              <Text style={styles.numberText}>{item.number}</Text>
              <Text style={styles.wordHint}>{item.word}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// Màn hình học hình dạng
function ShapesScreen({ onBack }) {
  const [selectedShape, setSelectedShape] = useState(null);

  return (
    <View style={styles.container}>
      {selectedShape ? (
        <View style={styles.shapeDetail}>
          <View style={[styles.shapeSample, { backgroundColor: selectedShape.color }]}>
            <Text style={styles.shapeText}>{selectedShape.name}</Text>
          </View>
          <Text style={styles.shapeDesc}>{selectedShape.desc}</Text>
          <TouchableOpacity
            style={styles.backToListButton}
            onPress={() => setSelectedShape(null)}
          >
            <Text style={styles.backToListText}>Xem tất cả hình dạng</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.menuGrid}>
          {shapes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.shapeItem, { backgroundColor: item.color }]}
              onPress={() => setSelectedShape(item)}
            >
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// Màn hình học màu sắc
function ColorsScreen({ onBack }) {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {colors.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              {
                width: width * 0.5, // 50% of the viewport width
                height: height * 0.25, // 25% of the viewport height
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: pressed ? '#55AA55' : item.hex,
              },
            ]}
          >
            <Text style={[styles.menuText, { color: item.textColor || '#FFF' }]}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}