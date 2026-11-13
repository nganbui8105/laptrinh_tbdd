import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TourScreen from './TourApp/TourScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <TourScreen />
    </SafeAreaProvider>
  );
}