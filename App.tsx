import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectionScreen from './src/screens/Selection';
import RunScreen from './src/screens/Run';
import SummaryScreen from './src/screens/Summary';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Summary'>
        <Stack.Screen name='Selection' component={SelectionScreen} />
        <Stack.Screen name='Run' component={RunScreen} />
        <Stack.Screen name='Summary' component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
