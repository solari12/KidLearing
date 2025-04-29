import React, { useState } from 'react';
const alphabet = require('../assets/data/alphabet.json');
const numbers = require('../assets/data/numbers.json');
const shapes = require('../assets/data/shapes.json');
const colors = require('../assets/data/colors.json');
import styles from '../global';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, Pressable } from 'react-native';
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
      {renderScreen()}
    </SafeAreaView>
  );
}

// Màn hình chính với các lựa chọn học tập
function Home({ onNavigate }) {
  return (
    <View style={styles.container}>
      <View style={styles.menuGrid}>
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? '#FF4C4C' : '#ED1C24' } // Vibrant red when pressed
          ]}
          onPress={() => onNavigate('alphabet')}
        >
          <Text style={styles.menuText}>Chữ Cái</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? '#A09BF0' : '#8F95D3' } // Vibrant purple when pressed
          ]}
          onPress={() => onNavigate('numbers')}
        >
          <Text style={styles.menuText}>Số</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? '#7DBF8A' : '#6B8F71' } // Vibrant green when pressed
          ]}
          onPress={() => onNavigate('shapes')}
        >
          <Text style={styles.menuText}>Hình Dạng</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? '#F7E07D' : '#F2CD5D' } // Vibrant yellow when pressed
          ]}
          onPress={() => onNavigate('colors')}
        >
          <Text style={styles.menuText}>Màu Sắc</Text>
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
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Học Chữ Cái</Text>
      </View>

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
              onPress={() => setSelectedLetter(item)}
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
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Học Số</Text>
      </View>

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
      <View style={[styles.header, { padding: 20, paddingBottom: 0 }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Học Hình Dạng</Text>
      </View>

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
      <View style={[styles.header, { padding: 20, paddingBottom: 0 }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Học Màu Sắc</Text>
      </View>
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