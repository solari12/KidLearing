import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, Pressable, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons'; // Thêm icon nếu muốn
import styles from '../global'; // Import styles từ file global.js
import colorsData from '../assets/data/colors.json'; // Import colors.json
import { startFloatingAnimation, startTrembleAnimation, stopAnimation, getRandomColor, getRandomBrightColor } from '../animations';
// Màn hình chính
export default function GameScreen() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'quiz':
        return <QuizScreen onBack={() => setCurrentScreen('home')} />;
      case 'colorGame':
        return <ColorGameScreen onBack={() => setCurrentScreen('home')} />;
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
  const trembleQuiz = useRef(new Animated.Value(0)).current;
  const trembleColors = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the floating animation
    startFloatingAnimation(floatAnimation);
  }, [floatAnimation]);

  return (
    <View style={styles.container}>
      <View style={styles.menuGrid}>
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? 'rgba(255, 24, 132, 0.5)' : 'transparent', width: '100%' },
          ]}
          onPress={() => onNavigate('quiz')}
          onPressIn={() => startTrembleAnimation(trembleQuiz)} // Start trembling for this button
          onPressOut={() => stopAnimation(trembleQuiz)} // Stop trembling for this button
        >
          <ImageBackground
            source={require('../assets/images/knowledge-bg.jpg')}
            style={styles.menuItemBackground}
            imageStyle={{ opacity: 0.8 }}
          >
            <Animated.Text
              style={[
                styles.menuText,
                {
                  transform: [
                    { translateY: floatAnimation }, // Apply floating animation
                    { translateX: trembleQuiz }, // Apply trembling animation
                  ],
                },
              ]}
            >
              Kiến Thức
            </Animated.Text>
          </ImageBackground>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            { backgroundColor: pressed ? 'rgba(255, 24, 132, 0.5)' : 'transparent', width: '100%' },
          ]}
          onPress={() => onNavigate('colorGame')}
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
// Màn hình trò chơi đơn giản
function QuizScreen({ onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Tải âm thanh
  const playSound = async (correct) => {
    const { sound } = await Audio.Sound.createAsync(
      correct
        ? require('../assets/sounds/Yasuo_Original_R_0.mp3')
        : require('../assets/sounds/Zed_Original_Attack_5.mp3')
    );
    await sound.playAsync();
  };

  const questions = [
    {
      question: 'Chữ cái nào đứng đầu bảng chữ cái?',
      options: ['C', 'B', 'A', 'D'],
      answer: 'A'
    },
    {
      question: 'Số nào là số lớn nhất trong các số sau?',
      options: ['5', '9', '3', '7'],
      answer: '9'
    },
    {
      question: 'Hình nào có 3 góc?',
      options: ['Vuông', 'Tròn', 'Tam giác', 'Chữ nhật'],
      answer: 'Tam giác'
    },
    {
      question: 'Màu của mặt trời là?',
      options: ['Xanh', 'Đỏ', 'Vàng', 'Tím'],
      answer: 'Vàng'
    },
    {
      question: 'Con vật nào kêu "gâu gâu"?',
      options: ['Mèo', 'Chó', 'Gà', 'Vịt'],
      answer: 'Chó'
    }
  ];

  const handleAnswer = async (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[currentQuestion].answer;
    await playSound(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };
  const getOptionColor = (index) => {
    const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4'];
    return colors[index % colors.length];
  };

  return (
    <ImageBackground
      source={require('../assets/images/knowledge-bg.jpg')}
      style={styles.menuItemBackground}
    >
      <View style={styles.screen}>
        {showResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Bạn đã trả lời đúng {score}/{questions.length} câu hỏi!</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
              <Text style={styles.resetButtonText}>Chơi lại</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.quizContainer}>
            <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
            <View style={styles.optionsContainer}>
              {questions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.optionButton, { backgroundColor: getOptionColor(index) }]}
                  onPress={() => handleAnswer(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}

            </View>
            <Text style={styles.progressText}>Câu hỏi {currentQuestion + 1}/{questions.length}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
function ColorGameScreen({ onBack }) {
  const [targetColor, setTargetColor] = useState('');
  const [message, setMessage] = useState('');
  const [displayedColors, setDisplayedColors] = useState([]);

  const getRandomColor = () => {
    const randomColor = colorsData[Math.floor(Math.random() * colorsData.length)];
    setTargetColor(randomColor.name); // Set the target color name

    // Shuffle colors and ensure the target color is included
    const shuffledColors = [...colorsData]
      .sort(() => Math.random() - 0.5) // Shuffle the colors
      .slice(0, 4); // Take 4 random colors
    if (!shuffledColors.some((color) => color.name === randomColor.name)) {
      shuffledColors.push(randomColor); // Ensure the target color is included
    }
    setDisplayedColors(shuffledColors.sort(() => Math.random() - 0.5)); // Shuffle again for randomness
    setMessage('');
  };

  const handleColorPress = (colorName) => {
    if (colorName === targetColor) {
      setMessage('Chính xác! 🎉');
    } else {
      setMessage('Sai rồi, thử lại nhé!');
    }
  };

  React.useEffect(() => {
    getRandomColor();
  }, []);

  const getTextColor = (colorName) => {
    const color = colorsData.find((c) => c.name === colorName);
    return color && color.textColor ? color.textColor : '#000'; // Default to black if not specified
  };

  return (
    <ImageBackground
      source={require('../assets/images/colors-bg.jpg')}
      style={styles.menuItemBackground}
      imageStyle={{ opacity: 0.8 }}
    >
      <View style={styles.screen}>
        <View style={styles.optionsContainer}>
          <Text style={styles.questionText}>Hãy chọn màu: {targetColor}</Text>
          {displayedColors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, { backgroundColor: color.hex }]}
              onPress={() => handleColorPress(color.name)}
            >
              <Text style={[styles.optionText, { color: getTextColor(color.name) }]} />
            </TouchableOpacity>
          ))}
          {message !== '' && <Text style={styles.progressText}>{message}</Text>}
          <TouchableOpacity style={styles.resetButton} onPress={getRandomColor}>
            <Text style={styles.resetButtonText}>Màu mới</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}