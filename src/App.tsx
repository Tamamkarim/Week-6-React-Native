import React from 'react';
import { SafeAreaView, Text, StyleSheet, Image } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/icon.png')} // غيّر الاسم لو حاب تستخدم صورة ثانية
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.text}>Hello, World!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  image: {
    width: 200,
    height: 200,
  },
});
