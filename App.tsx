import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import TabNavigator from './src/navigators/TabNavigator';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';
import TicketScreen from './src/screens/TicketScreen';


const Stack = createStackNavigator();
const NativeStack = createNativeStackNavigator();

const Auth = () => {
  return(
    <Stack.Navigator initialRouteName='WelcomeScreen'>
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerShown: false}} />
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator> 
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator initialRouteName='WelcomeScreen' screenOptions={{headerShown: false}}>
        <NativeStack.Screen name="Tab" component={TabNavigator} options={{animation: "default"}}/>
        <NativeStack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{animation: "slide_from_right"}}/>
        <NativeStack.Screen name="SeatBooking" component={SeatBookingScreen} options={{animation: "slide_from_left"}}/>
        <NativeStack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown: false, animation:"fade"}} />
        <NativeStack.Screen name='Auth' component={Auth} options={{headerShown: false, animation: "fade_from_bottom"}}/>
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {}
});
