import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

const { width } = Dimensions.get('window');

export default function HandwritingGameScreen() {
  const [result, setResult] = useState('');
  const [targetNumber, setTargetNumber] = useState(0);
  const signRef = useRef();

  // Danh sách hình ảnh số 0–9
  const numberImages = {
    0: require('../assets/numbers/0.jpg'),
    1: require('../assets/numbers/1.png'),
    2: require('../assets/numbers/2.jpg'),
    3: require('../assets/numbers/3.png'),
    4: require('../assets/numbers/4.jpg'),
    5: require('../assets/numbers/5.jpg'),
    6: require('../assets/numbers/6.jpg'),
    7: require('../assets/numbers/7.jpg'),
    8: require('../assets/numbers/8.jpg'),
    9: require('../assets/numbers/9.jpg'),
  };

  const handleOK = async (signature) => {
    if (!signature) {
      setResult('❌ Bé hãy viết số trước khi gửi nhé!');
      return;
    }
    setResult('→ Đang xử lý...');
    // Loại bỏ tiền tố base64
    const cleanSignature = signature.replace('data:image/png;base64,', '');
    await recognizeCharacter(cleanSignature);
  };

  const recognizeCharacter = async (base64Image) => {
    try {
      const response = await fetch('http://192.168.1.9:5000/recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.number == targetNumber) {
          setResult(`✅ Giỏi lắm! Bé đã viết đúng số ${targetNumber}`);
        } else {
          setResult(`❌ Bé viết số ${data.number}, hãy thử viết số ${targetNumber} nhé!`);
        }
      } else {
        setResult('❌ Lỗi xử lý: ' + data.error);
      }
    } catch (err) {
      console.error('Lỗi gửi ảnh:', err);
      setResult('❌ Không gửi được ảnh, kiểm tra kết nối!');
    }
  };

  const handleClear = () => {
    signRef.current.clearSignature();
    setResult('');
  };

  const handleNextNumber = () => {
    const next = (targetNumber + 1) % 10;
    setTargetNumber(next);
    handleClear();
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.instructionText}>Viết số {targetNumber} theo mẫu dưới đây:</Text>
      <View style={styles.imageContainer}>
        <Image
          source={numberImages[targetNumber]}
          style={styles.numberImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.canvasWrapper}>
        <SignatureScreen
          ref={signRef}
          onOK={handleOK}
          clearText="Xoá"
          confirmText="Gửi"
          descriptionText="Vẽ số vào đây"
          autoClear={false}
          style={styles.signatureCanvas}
          backgroundColor="#fff"
          penColor="black"
          webStyle={`
            .m-signature-pad { border: 2px dashed #ccc; border-radius: 8px; }
            .m-signature-pad--body { background: #fff; }
          `}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextNumber}>
          <Text style={styles.buttonText}>➡️ Tiếp theo</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.progressText}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  instructionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  numberImage: {
    width: width * 0.4,
    height: width * 0.4,
  },
  canvasWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  signatureCanvas: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: '#FFB6C1',
    flex: 1,
    marginRight: 5,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#87CEFA',
    flex: 1,
    marginLeft: 5,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    color: '#333',
  },
});