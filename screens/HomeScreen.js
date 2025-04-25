import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';

// Màn hình chính
export default function HomeScreen() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch(currentScreen) {
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
    <View style={styles.screen}>
      <Text style={styles.title}>Học Cùng Bé</Text>
      
      <View style={styles.menuGrid}>
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#FF9AA2' }]} 
          onPress={() => onNavigate('alphabet')}
        >
          <Text style={styles.menuText}>Chữ Cái</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#FFDAC1' }]} 
          onPress={() => onNavigate('numbers')}
        >
          <Text style={styles.menuText}>Số</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#E2F0CB' }]} 
          onPress={() => onNavigate('shapes')}
        >
          <Text style={styles.menuText}>Hình Dạng</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#B5EAD7' }]} 
          onPress={() => onNavigate('colors')}
        >
          <Text style={styles.menuText}>Màu Sắc</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Màn hình học bảng chữ cái
function AlphabetScreen({ onBack }) {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const alphabet = [
    { letter: 'A', word: 'Ấm', pronoun: 'A như Ấm' },
    { letter: 'B', word: 'Bóng', pronoun: 'B như Bóng' },
    { letter: 'C', word: 'Cá', pronoun: 'C như Cá' },
    { letter: 'D', word: 'Dừa', pronoun: 'D như Dừa' },
    { letter: 'E', word: 'Em', pronoun: 'E như Em' },
    { letter: 'F', word: 'Fanta', pronoun: 'F như Fanta' },
    { letter: 'G', word: 'Gà', pronoun: 'G như Gà' },
    { letter: 'H', word: 'Hoa', pronoun: 'H như Hoa' },
    { letter: 'I', word: 'Im', pronoun: 'I như Im' },
    { letter: 'J', word: 'Jeans', pronoun: 'J như Jeans' },
    { letter: 'K', word: 'Kẹo', pronoun: 'K như Kẹo' },
    { letter: 'L', word: 'Lá', pronoun: 'L như Lá' },
    { letter: 'M', word: 'Mẹ', pronoun: 'M như Mẹ' },
    { letter: 'N', word: 'Nón', pronoun: 'N như Nón' },
    { letter: 'O', word: 'Ốc', pronoun: 'O như Ốc' },
    { letter: 'P', word: 'Phở', pronoun: 'P như Phở' },
    { letter: 'Q', word: 'Quạt', pronoun: 'Q như Quạt' },
    { letter: 'R', word: 'Rổ', pronoun: 'R như Rổ' },
    { letter: 'S', word: 'Sách', pronoun: 'S như Sách' },
    { letter: 'T', word: 'Tivi', pronoun: 'T như Tivi' },
    { letter: 'U', word: 'Ú', pronoun: 'U như Ú' },
    { letter: 'V', word: 'Vịt', pronoun: 'V như Vịt' },
    { letter: 'W', word: 'Wifi', pronoun: 'W như Wifi' },
    { letter: 'X', word: 'Xe', pronoun: 'X như Xe' },
    { letter: 'Y', word: 'Yến', pronoun: 'Y như Yến' },
    { letter: 'Z', word: 'Zoo', pronoun: 'Z như Zoo' }
  ];

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
  const numbers = [
    { number: '1', word: 'Một', example: '1 quả táo' },
    { number: '2', word: 'Hai', example: '2 con mèo' },
    { number: '3', word: 'Ba', example: '3 bông hoa' },
    { number: '4', word: 'Bốn', example: '4 chiếc xe' },
    { number: '5', word: 'Năm', example: '5 ngón tay' },
    { number: '6', word: 'Sáu', example: '6 cái bánh' },
    { number: '7', word: 'Bảy', example: '7 màu cầu vồng' },
    { number: '8', word: 'Tám', example: '8 chú vịt' },
    { number: '9', word: 'Chín', example: '9 ngôi sao' },
    { number: '10', word: 'Mười', example: '10 ngón tay và chân' }
  ];

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
  const shapes = [
    { name: 'Tròn', desc: 'Hình tròn không có góc', color: '#FF9AA2' },
    { name: 'Vuông', desc: 'Hình vuông có 4 góc bằng nhau', color: '#FFDAC1' },
    { name: 'Tam giác', desc: 'Hình tam giác có 3 góc', color: '#E2F0CB' },
    { name: 'Chữ nhật', desc: 'Hình chữ nhật có 4 góc vuông', color: '#B5EAD7' },
    { name: 'Ngôi sao', desc: 'Hình ngôi sao có nhiều cạnh nhọn', color: '#C7CEEA' },
    { name: 'Oval', desc: 'Hình Oval giống quả trứng', color: '#FF9AA2' }
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
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
        <ScrollView contentContainerStyle={styles.shapesGrid}>
          {shapes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.shapeItem, { backgroundColor: item.color }]}
              onPress={() => setSelectedShape(item)}
            >
              <Text style={styles.shapeText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// Màn hình học màu sắc
function ColorsScreen({ onBack }) {
  const colors = [
    { name: 'Đỏ', hex: '#FF0000' },
    { name: 'Xanh lá', hex: '#00FF00' },
    { name: 'Xanh dương', hex: '#0000FF' },
    { name: 'Vàng', hex: '#FFFF00' },
    { name: 'Cam', hex: '#FFA500' },
    { name: 'Tím', hex: '#800080' },
    { name: 'Hồng', hex: '#FFC0CB' },
    { name: 'Nâu', hex: '#A52A2A' },
    { name: 'Đen', hex: '#000000', textColor: '#FFFFFF' },
    { name: 'Trắng', hex: '#FFFFFF', textColor: '#000000' }
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Học Màu Sắc</Text>
      </View>

      <ScrollView contentContainerStyle={styles.colorsContainer}>
        {colors.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorItem, { backgroundColor: item.hex }]}
          >
            <Text style={[styles.colorText, { color: item.textColor || '#FFFFFF' }]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Định dạng giao diện
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  screen: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 32,
    color: '#333',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  // Styles cho màn hình chữ cái
  alphabetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  letterItem: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: '#FFE8E8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  letterText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  wordHint: {
    fontSize: 12,
    color: '#666',
  },
  letterDetail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigLetter: {
    fontSize: 96,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 16,
  },
  letterWord: {
    fontSize: 32,
    color: '#333',
    marginBottom: 8,
  },
  letterPronoun: {
    fontSize: 24,
    color: '#666',
    marginBottom: 32,
  },
  backToListButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  backToListText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Styles cho màn hình số
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  numberItem: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#FFF0DB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  numberText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF8C42',
  },
  numberDetail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigNumber: {
    fontSize: 96,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginBottom: 16,
  },
  numberWord: {
    fontSize: 32,
    color: '#333',
    marginBottom: 8,
  },
  numberExample: {
    fontSize: 24,
    color: '#666',
    marginBottom: 32,
  },
  // Styles cho màn hình hình dạng
  shapesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  shapeItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shapeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  shapeDetail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapeSample: {
    width: 200,
    height: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  shapeDesc: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  // Styles cho màn hình màu sắc
  colorsContainer: {
    paddingBottom: 32,
  },
  colorItem: {
    width: '100%',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  colorText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});