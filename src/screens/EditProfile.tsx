import React, { createRef, useState } from 'react';
import { Text, View, StyleSheet, Alert, KeyboardAvoidingView, Keyboard, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Loader from '../components/Loader';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';

const EditProfileScreen = ({navigation}: any) => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const emailInputRef = createRef();
    const passwordInputRef = createRef();

  return (
    <View style={{flex: 1, backgroundColor: COLORS.Black}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
            <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'Edit Your Profile'}
            action={() => navigation.goBack()}
          />  
      </View>
        {/* <View style={{alignItems: 'center', marginTop: 40, marginBottom: 120}}>
          <Text style={{width: "100%", marginTop: 20, marginLeft:130, color:"#FFFFFF", fontSize: 30, fontWeight: "bold"}}>Edit Your Profile</Text>
        </View> */}
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(userName) => setUserName(userName)}
              underlineColorAndroid="#f000"
              placeholder="Enter New Userame"
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
              onChangeText={(password) => setPassword(password)}
              underlineColorAndroid="#f000"
              placeholder="Change Password"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current 
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(password) =>
                setConfirmPassword(password)
              }
              underlineColorAndroid="#f000"
              placeholder="Confirm new password"
              placeholderTextColor="#8b9cb5"
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
            >
            <Text style={styles.buttonTextStyle}>Edit my profile</Text>
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
    appHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_20 ,
        marginBottom: SPACING.space_20 * 3,
      },
});

export default EditProfileScreen;