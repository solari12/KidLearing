import React, { useState, useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
const alphabet = require('../assets/data/alphabet.json');
const numbers = require('../assets/data/numbers.json');
const shapes = require('../assets/data/shapes.json');
const colors = require('../assets/data/colors.json');
import { startFloatingAnimation, startTrembleAnimation, stopAnimation, getRandomColor, getRandomBrightColor } from '../animations';
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
    startFloatingAnimation(floatAnimation);
  }, [floatAnimation]);

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
          onPressIn={() => startTrembleAnimation(trembleAlphabet)} // Start trembling for this button
          onPressOut={() => stopAnimation(trembleAlphabet)} // Stop trembling for this button
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
          onPressIn={() => startTrembleAnimation(trembleNumbers)} // Start trembling for this button
          onPressOut={() => stopAnimation(trembleNumbers)} // Stop trembling for this button
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
          onPressIn={() => startTrembleAnimation(trembleShapes)} // Start trembling for this button
          onPressOut={() => stopAnimation(trembleShapes)} // Stop trembling for this button
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
          onPressIn={() => startTrembleAnimation(trembleColors)} // Start trembling for this button
          onPressOut={() => stopAnimation(trembleColors)} // Stop trembling for this button
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
  const [selectedColor, setSelectedColor] = useState(null);
  const [dynamicAlphabet, setDynamicAlphabet] = useState([]);
  useEffect(() => {
    const updatedAlphabet = alphabet.map((item) => ({
      ...item,
      color: getRandomBrightColor(), // Assign a random bright color
    }));
    setDynamicAlphabet(updatedAlphabet);
  }, []);

  return (
    <View style={styles.screen}>
      {selectedLetter ? (
        <View style={styles.letterDetail}>
          <Text style={[
            styles.bigLetter,
            { color: selectedColor }
          ]}>{selectedLetter.letter}</Text>
          <Text style={styles.letterWord}>{selectedLetter.word}</Text>
          <Text style={styles.letterPronoun}>{selectedLetter.pronoun}</Text>
          <TouchableOpacity
            style={[
              styles.backToListButton,
              { backgroundColor: selectedColor }
            ]}
            onPress={() => setSelectedLetter(null)}
          >
            <Text style={styles.backToListText}>Xem tất cả chữ cái</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.alphabetGrid}
          showsVerticalScrollIndicator={false}
        >
          {dynamicAlphabet.map((item) => (
            <TouchableOpacity
              key={item.letter}
              style={[
                styles.letterItem,
                { backgroundColor: item.color } // Random color for each letter
              ]}
              onPress={() => {
                setSelectedLetter(item);
                setSelectedColor(item.color)
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
          <Text style={styles.numberDesc}>{selectedNumber.desc}</Text>
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

  const renderShape = () => {
    if (!selectedShape) return null;

    return (
      <View style={styles.shapeDetail}>
        {/* Emoji as Background */}
        <View
          style={[
            styles.emojiBackgroundContainer,
          ]}
        >
          <Text style={styles.emojiBackground}>{selectedShape.example}</Text>
        </View>

        {/* Overlay Content */}
        <Text style={styles.shapeText}>{selectedShape.name}</Text>
        <Text style={styles.shapeDesc}>{selectedShape.desc}</Text>
        <TouchableOpacity
          style={styles.backToListButton}
          onPress={() => setSelectedShape(null)}
        >
          <Text style={styles.backToListText}>Xem tất cả hình dạng</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/shapes-bg.jpg')} 
      style={styles.container} 
      imageStyle={{ opacity: 0.2 }} 
    >
      {selectedShape ? (
        renderShape()
      ) : (
        <ScrollView
          contentContainerStyle={styles.shapesGrid}
          showsVerticalScrollIndicator={false}
        >
          {shapes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.shapeItem, { backgroundColor: item.color }]}
              onPress={() => setSelectedShape(item)}
            >
              <Text style={styles.menuText}>{item.name}</Text>
              <Text style={styles.menuText}>{item.example}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </ImageBackground>
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