import React, { createRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, Keyboard, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../components/Loader';
import { TouchableOpacity } from 'react-native-gesture-handler';


const LoginScreen = ({navigation}: any) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [auth, setAuth] = useState<boolean>(false);

    const passwordInputRef = createRef();

    const handleSubmitButton = () => {
        setErrorText("");
        if(!email){
            Alert.alert("Please fill email")
            return;
        }
        if(!password){
            Alert.alert("Please fill password")
            return;
        }
        setAuth(true);
        handleLogin();
    }
    
    const handleLogin = () => {
        auth ?
        navigation.navigate("Tab") : ""
    }

  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView>
        <View>
            <KeyboardAvoidingView enabled>
                <View style={styles.logo}>
                    <Text style={{width: "100%", marginTop: 20, marginLeft:130, color:"#FFFFFF", fontSize: 30, fontWeight: "bold"}}>BOOK YOUR TICKET</Text>
                </View>

                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(userEmail) => setEmail(userEmail)}
                        placeholder='Enter Email'
                        placeholderTextColor="#8b9cb5"
                        autoCapitalize='none'
                        keyboardType='email-address'
                        returnKeyType='next'
                        onSubmitEditing={()=> 
                            passwordInputRef.current && 
                            passwordInputRef.current.focus()
                        }
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.sectionStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={(password) => {
                            setPassword(password)
                        }}
                        placeholder='Enter Password'
                        placeholderTextColor="#8b9cb5"
                        keyboardType='default'
                        ref={passwordInputRef}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                        secureTextEntry={true}
                        underlineColorAndroid="#f000"
                        returnKeyType='next'
                    />
                </View>
                {errorText != "" ? (
                    <Text style={styles.errorTextStyle}>
                        {errorText}
                    </Text>
                ): null}
                <TouchableOpacity style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleSubmitButton}
                >
                    <Text style={styles.buttonTextStyle} >LOGIN</Text>
                   
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={styles.registerTextStyle} onPress={() => {
                        navigation.navigate("RegisterScreen")
                    }}>New Here ? Register</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    mainBody: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#307ecc",
        alignContent: "center"
    },
    sectionStyle: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    buttonStyle: {
        backgroundColor: "#7DE24E",
        borderWidth: 0,
        color: "#FFFFFF",
        borderColor: "#7DE24E",
        height: 40,
        alignItems: "center",
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    logo: {
        // flex: 1,
        marginTop: 40,
        marginBottom: 120,
         alignItems: "center",
         justifyContent: "center"
    }
});

export default LoginScreen;