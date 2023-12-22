import React, { createRef, useState } from 'react';
import { Text, View, StyleSheet, Alert, KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';
import Loader from '../components/Loader';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useMutation } from 'react-query';
import { register } from '../api/auth/auth';
import axios from 'axios';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const RegisterScreen = ({navigation}: any, {props}: any) => {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState<boolean>(false);

    const emailInputRef = createRef();
    const passwordInputRef = createRef();

    const mutation = useMutation(register, {
      onSuccess: () => {
        setLoading(false);
        navigation.navigate('LoginScreen');
      },
      onError: (error: any) => {
        setLoading(false);
        setErrorText(error.message || 'Registration Failed: Please try again');
      },
    });
    
    const handleSubmitButton = () => {
        setErrorText("");
        if(!userName){
            Alert.alert("Please fill name")
            return;
        }
        if(!email){
            Alert.alert("Please fill email")
            return;
        }
        if(!password){
            Alert.alert("Please fill password")
            return;
        }
        mutation.mutate({
          username: userName,
          email: email,
          password: password,
        });
        setLoading(true);
    }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.Black}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center', marginTop: 40, marginBottom: 120}}>
          <Text style={{width: "100%", marginTop: 20, marginLeft:130, color:"#FFFFFF", fontSize: 30, fontWeight: "bold"}}>BOOK YOUR TICKET</Text>
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userName) => setUserName(userName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current 
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(email) => setEmail(email)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              // ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current 
                // passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(password) =>
                setPassword(password)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              // ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
         
          {errorText != '' ? (
            <Text style={styles.errorTextStyle}>
              {errorText}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
            
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton1}>
            <Text style={styles.buttonTextStyle}>REGISTER1</Text> */}     
          {/* </TouchableOpacity> */}
          
          <TouchableOpacity>
          <Text style={styles.registerTextStyle} onPress={() => {
                        navigation.navigate("LoginScreen")
                    }}>Already Registered ? Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
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
      successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
      },
      registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
});

export default RegisterScreen;