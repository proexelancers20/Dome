import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardScanner from '../screens/CardScanner';
import Home from '../screens/Home';
import ProfileScanner from '../screens/ProfileScanner';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CardScanner" component={CardScanner} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProfileScanner" component={ProfileScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
