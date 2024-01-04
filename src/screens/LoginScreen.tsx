import React, { createRef, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, Keyboard, Alert } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { useMutation } from 'react-query';
import { login } from '../api/auth/auth';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({navigation}: any) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [errorText, setErrorText] = useState<string>("");

    const passwordInputRef = createRef();

    const mutation = useMutation(login, {
        onSuccess: async (data) => {
            setLoading(false);
            if(data.success){
               navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: "Tab"}],
                })
               )
            }else{
                setErrorText("Invalid Credentials");
            }
        },
        onError: (error:any) => {
            setLoading(false);
            console.log("This is error message",error.messsage);
            setErrorText(error.message || "Login Failed: Please try again");
        }
    })

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

        mutation.mutate({
            email: email,
            password: password,
        })
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
                            passwordInputRef.current
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
                        // ref={passwordInputRef}
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
        backgroundColor: COLORS.Black,
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
        alignItems: 'center',
        marginVertical: SPACING.space_36,
    },
    buttonTextStyle: {
        borderRadius: BORDERRADIUS.radius_25 * 2,
      paddingHorizontal: SPACING.space_24,
      paddingVertical: SPACING.space_10,
      backgroundColor: COLORS.Orange,
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_14,
      color: COLORS.White,
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