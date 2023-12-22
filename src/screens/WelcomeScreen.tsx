import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = ({navigation}: any) => {
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            setTimeout(() => {
              setAnimating(false);
              AsyncStorage.getItem('accessToken').then((value) => {
                navigation.replace(
                  value === null ? "Auth" : "Tab"
                );
              });
            }, 5000);
          } catch (error) {
            console.error('Error checking authentication:', error);
          }
        };
      
        checkAuthentication();
      }, []);
      

  return (
    <View style={styles.container}>
        <View style={styles.logo}>
            <Text style={{width: "100%", margin: 30, color:"#FFFFFF", fontSize: 40, fontWeight: "bold"}}>BOOK YOUR TICKET</Text>
        </View>
      <ActivityIndicator animating={animating} color="#FFFFFF" size="large" style={styles.activityIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#307ecc",
    },
    activityIndicator: {
        alignItems: "center",
        height: 80
    },
    logo: {
         alignItems: "center",
         justifyContent: "center"
    }
});

export default WelcomeScreen;