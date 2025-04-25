import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import HandwritingGameScreen from './HandwritingGameScreen';
// Màn hình chính
export default function GameScreen() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch(currentScreen) {
      case 'home':
        return <Home onNavigate={setCurrentScreen} />;
      case 'quiz':
        return <QuizScreen onBack={() => setCurrentScreen('home')} />;
      case 'colorGame':
        return <ColorGameScreen onBack={() => setCurrentScreen('home')} />;
      case 'handwriting':
        return <HandwritingGameScreen onBack={() => setCurrentScreen('home')} />;
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
          style={[styles.menuItem, { backgroundColor: '#C7CEEA' }]} 
          onPress={() => onNavigate('quiz')}
        >
          <Text style={styles.menuText}>Trò Chơi</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#FFDAC1' }]} 
          onPress={() => onNavigate('colorGame')}
        >
          <Text style={styles.menuText}>Màu Sắc</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: '#B5EAD7' }]} 
          onPress={() => onNavigate('handwriting')}
        >
          <Text style={styles.menuText}>Tập viết</Text>
        </TouchableOpacity>


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
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Quay lại</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Trò Chơi</Text>
        </View>
  
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
    );
  }
function ColorGameScreen({ onBack }) {
  const [targetColor, setTargetColor] = useState('');
  const [message, setMessage] = useState('');
  const colors = ['Đỏ', 'Vàng', 'Xanh', 'Tím'];

  const getRandomColor = () => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(random);
    setMessage('');
  };

  const handleColorPress = (color) => {
    if (color === targetColor) {
      setMessage('Chính xác! 🎉');
    } else {
      setMessage('Sai rồi, thử lại nhé!');
    }
  };

  React.useEffect(() => {
    getRandomColor();
  }, []);

  const getColorCode = (color) => {
    switch (color) {
      case 'Đỏ': return '#F44336';
      case 'Vàng': return '#FFEB3B';
      case 'Xanh': return '#4CAF50';
      case 'Tím': return '#9C27B0';
      default: return '#FFF';
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Chọn Màu</Text>
      </View>

      <Text style={styles.questionText}>Hãy chọn màu: {targetColor}</Text>
      <View style={styles.optionsContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.optionButton, { backgroundColor: getColorCode(color) }]} 
            onPress={() => handleColorPress(color)}
          >
            <Text style={[styles.optionText, { color: '#000' }]}></Text>
          </TouchableOpacity>
        ))}
      </View>
      {message !== '' && <Text style={styles.progressText}>{message}</Text>}
      <TouchableOpacity style={styles.resetButton} onPress={getRandomColor}>
        <Text style={styles.resetButtonText}>Màu mới</Text>
      </TouchableOpacity>
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

  // Styles cho trò chơi
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionButton: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});