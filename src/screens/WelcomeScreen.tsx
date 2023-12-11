import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

const WelcomeScreen = ({navigation}: any) => {
    const [animating, setAnimating] = useState(true);

    useEffect(()=> {
        setTimeout(()=> {
            setAnimating(false);

            //checking user_id and authenticating
            AsyncStorage.getItem('user_id').then((value)=> {
                navigation.replace(
                    value === null ? "Auth" : "Tab"
                )
            })
        }, 5000)
    }, [])

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
        // flex: 1,
         alignItems: "center",
         justifyContent: "center"
    }
});

export default WelcomeScreen;