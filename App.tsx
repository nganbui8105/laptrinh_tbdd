import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MovieScreen from './MovieApp/MovieScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <MovieScreen />
    </SafeAreaProvider>
  );
}