import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import talkingAnimation from './assets/talking_character.json'; // Thay bằng đường dẫn đúng

const GEMINI_API_KEY = 'AIzaSyDImfAThEyT7pz9VdZLlKivVzasOhwfCRg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export default function StudyScreen() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('vi-VN');
  const [voice, setVoice] = useState('vi-vn-x-vif-network');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const checkVoices = async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      console.log(voices);
    };
    checkVoices();
  }, []);

  useEffect(() => {
    if (isSpeaking) {
      animationRef.current?.play();
    } else {
      animationRef.current?.reset();
    }
  }, [isSpeaking]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    const result = await callGeminiAPI(inputText.trim());
    setResponseText(result);
    speak(result);
    setLoading(false);
  };

  const callGeminiAPI = async (text) => {
    try {
      const res = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: `Hãy trả lời bằng ${language === 'vi-VN' ? 'tiếng Việt' : language === 'ja-JP' ? 'tiếng Nhật' : 'tiếng Anh'}: ${text}` }]
            }
          ]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      return res.data.candidates[0].content.parts[0].text;
    } catch (err) {
      console.error('Gemini error:', err);
      return language === 'vi-VN' 
        ? 'Có lỗi xảy ra khi gọi API. Vui lòng thử lại.' 
        : language === 'ja-JP' 
        ? 'API呼び出し中にエラーが発生しました。もう一度お試しください。' 
        : 'An error occurred while calling the API. Please try again.';
    }
  };

  const speak = (text) => {
    setIsSpeaking(true);
    Speech.speak(text, {
      voice: voice,
      language: language,
      pitch: 1.2,
      rate: 0.92,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: (error) => {
        console.log('Speech error:', error);
        setIsSpeaking(false);
      },
    });
  };

  const handleLanguageChange = (lang, voiceId) => {
    setLanguage(lang);
    setVoice(voiceId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trợ lý ảo Gemini</Text>

      <View style={styles.languageButtons}>
        <Button
          title="Tiếng Việt"
          onPress={() => handleLanguageChange('vi-VN', 'vi-vn-x-vif-network')}
          color={language === 'vi-VN' ? '#007AFF' : '#ccc'}
        />
        <Button
          title="Tiếng Nhật"
          onPress={() => handleLanguageChange('ja-JP', 'ja-jp-x-jac-local')}
          color={language === 'ja-JP' ? '#007AFF' : '#ccc'}
        />
        <Button
          title="Tiếng Anh"
          onPress={() => handleLanguageChange('en-US', 'en-us-x-tpc-local')}
          color={language === 'en-US' ? '#007AFF' : '#ccc'}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nhập câu hỏi..."
        value={inputText}
        onChangeText={setInputText}
        multiline
      />
      <Button title="Gửi" onPress={handleSend} disabled={loading} />

      {/* 🔊 Animation nói */}
      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <LottieView
          ref={animationRef}
          source={talkingAnimation}
          loop
          style={{ width: 150, height: 150 }}
        />
      </View>

      <ScrollView style={styles.responseContainer}>
        <Text style={styles.response}>{loading ? 'Đang xử lý...' : responseText}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    minHeight: 60,
  },
  responseContainer: { marginTop: 20, maxHeight: 300 },
  response: { fontSize: 16, color: '#333' },
});
