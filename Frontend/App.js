import React from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { theme } from './core/theme'
import LoginScreen from './screens/login.screen'
import AdminScreen from './screens/admin.screen'
import AthleteScreen from './screens/athlete.screen';

const Stack = createStackNavigator()

export default function App() {
  return ( 
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}>
          
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AdminScreen" component={AdminScreen} />
          <Stack.Screen name="AthleteScreen" component={AthleteScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

