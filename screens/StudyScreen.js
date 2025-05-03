import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDImfAThEyT7pz9VdZLlKivVzasOhwfCRg';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export default function VoiceAssistant() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

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
              parts: [{ text }]
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
      return 'Có lỗi xảy ra khi gọi API. Vui lòng thử lại.';
    }
  };

  const speak = (text) => {
    Speech.speak(text, {
      language: 'vi-VN',
      pitch: 1.2,      // Cao hơn giọng bình thường
      rate: 0.95       // Chậm nhẹ
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trợ lý ảo Gemini</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập câu hỏi..."
        value={inputText}
        onChangeText={setInputText}
        multiline
      />
      <Button title="Gửi" onPress={handleSend} disabled={loading} />
      <ScrollView style={styles.responseContainer}>
        <Text style={styles.response}>{loading ? 'Đang xử lý...' : responseText}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    minHeight: 60
  },
  responseContainer: { marginTop: 20, maxHeight: 300 },
  response: { fontSize: 16, color: '#333' }
});
