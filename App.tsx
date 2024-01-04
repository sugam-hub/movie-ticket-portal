import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider} from 'react-query';

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
import EditProfileScreen from './src/screens/EditProfile';

const Stack = createStackNavigator();
const NativeStack = createNativeStackNavigator();

const queryClient = new QueryClient();

const Auth = () => {
  return(
    <Stack.Navigator initialRouteName='Auth'>
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{headerShown: false}} />
      <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator> 
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <NativeStack.Navigator initialRouteName='WelcomeScreen' screenOptions={{headerShown: false}}>
        <NativeStack.Screen name="Tab" component={TabNavigator} options={{animation: "default"}}/>
        <NativeStack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{animation: "slide_from_right"}}/>
        <NativeStack.Screen name="SeatBooking" component={SeatBookingScreen} options={{animation: "slide_from_left"}}/>
        <NativeStack.Screen name='EditProfile' component={EditProfileScreen} options={{animation: "fade_from_bottom"}} />
        <NativeStack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown: false, animation:"fade"}} />
        <NativeStack.Screen name='Auth' component={Auth} options={{headerShown: false, animation: "fade_from_bottom"}}/>
      </NativeStack.Navigator>
    </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {}
});
