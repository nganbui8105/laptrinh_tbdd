import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './BikeShop/types';
import Screen_01 from './BikeShop/Screen_01';
import Screen_02 from './BikeShop/Screen_02';
import Screen_03 from './BikeShop/Screen_03';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Screen_01" component={Screen_01} />
        <Stack.Screen name="Screen_02" component={Screen_02} />
        <Stack.Screen name="Screen_03" component={Screen_03} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}