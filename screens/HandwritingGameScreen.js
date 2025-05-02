import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

export default function HandwritingGameScreen({ onBack }) {
  const [result, setResult] = useState('');
  const signRef = useRef();

  const handleOK = async (signature) => {
    // Kiểm tra và gửi hình ảnh chữ ký  
    if (signature) {
      setResult('→ Đang xử lý...');
      await recognizeCharacter(signature);
    } else {
      setResult('❌ Không có cơ sở dữ liệu để gửi');
    }
  };

  const recognizeCharacter = async (base64Image) => {
    try {
      const response = await fetch('http://192.168.1.16:5000/recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`Bạn vừa viết: ${data.character}`);  // Sửa từ data.character → data.number
      } else {
        setResult('❌ Lỗi xử lý: ' + data.error);
      }
    } catch (err) {
      console.error('Lỗi gửi ảnh:', err);
      setResult('❌ Không gửi được ảnh tới API');
    }
  };

  const handleClear = () => {
    signRef.current.clearSignature();
    setResult('');
  };

  return (
    <View style={[styles.screen, { flex: 1 }]}>
      <SignatureScreen
        ref={signRef}
        onOK={handleOK}  // Gọi handleOK trực tiếp  
        clearText="Xoá"
        confirmText="Gửi"
        descriptionText="Viết một chữ cái"
        autoClear={false}
        style={{ flex: 1, height: 1000 }}
        backgroundColor="white" // Đặt màu nền đúng  
        penColor="black"       // Đặt màu bút vẽ  
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleClear}>
        <Text style={styles.resetButtonText}>Xoá nét vẽ</Text>
      </TouchableOpacity>

      <Text style={styles.progressText}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 12,
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
  resetButton: {
    backgroundColor: '#FFB6C1',
    margin: 20,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 12,
    color: '#333',
  },
});  