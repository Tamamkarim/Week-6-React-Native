import React from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff'}}>
        <Image source={require('../assets/icon.png')} style={{ width: 100, height: 100 }} />
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Hello, World!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
