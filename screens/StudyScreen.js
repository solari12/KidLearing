import React from 'react';
import { View, Text } from 'react-native';

export default function StudyScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>🏠 Học từ vựng</Text>
    </View>
  );
}

const styles = {
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  text: {
    fontSize: 28,
  },
};
