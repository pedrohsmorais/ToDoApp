import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import List from './src/screen/List/List';
import TaskList from './src/screen/TaskList/TaskList'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <StatusBar backgroundColor={'transparent'} translucent barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={List} />
        <Stack.Screen name="Lista" component={TaskList} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}