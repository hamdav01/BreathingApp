import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectionScreen from './src/screens/Selection';
import RunScreen from './src/screens/Run';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Selection'>
        <Stack.Screen name='Selection' component={SelectionScreen} />
        <Stack.Screen name='Run' component={RunScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
