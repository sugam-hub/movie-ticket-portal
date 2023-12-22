import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserId, hasTokenExpired, getInfo, getUserInfo } from '../utils/Helpers';

const UserAccountScreen = ({navigation}: any) => {
  // const [userId, setUserId] = useState<string | null>(null);
  // const [userInfo, setUserInfo] = useState<any | null>(null);
  // const [tokenInfo, setTokenInfo] = useState<any | null>(null);
  // const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);

  // useEffect(() => {
  //   const fetchTokenInfo = async () => {
  //     const id = await getUserId();
  //     const info = await getUserInfo();
  //     const token = await getInfo();
  //     const expired = await hasTokenExpired();

  //     setUserId(id);
  //     setUserInfo(info);
  //     setTokenInfo(token);
  //     if (expired !== undefined) {
  //       setIsTokenExpired(expired);
  //     } else {
  //       setIsTokenExpired(false);
  //     }
  //   };

  //   fetchTokenInfo();
  // }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    navigation.navigate("Auth")
  } 
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={'My Profile'}
            action={() => navigation.goBack()}
          />  
      </View>

      <View style={styles.profileContainer}>
        <Image source={require("../assets/image/me1.jpg")} style={styles.avatarImage} />
        <Text style={styles.avatarText}>Sugam Poudel</Text>
        <TouchableOpacity style={styles.buttonBG} 
        onPress={() => {
          handleLogout()
        }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <SettingComponent icon="user" heading="Account" subheading="Edit Profile" subtitle="Change Password" />
        <SettingComponent icon="setting" heading="Setting" subheading="Theme" subtitle="Permissions" />
        <SettingComponent icon="dollar" heading="Offers and Referrals" subheading="Offer" subtitle="Referrals" />
        <SettingComponent icon="info" heading="About" subheading="About Movies" subtitle="more" />
      </View>     
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      backgroundColor: COLORS.Black
    },
    appHeaderContainer: {
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_20 ,
      // marginBottom: SPACING.space_20* 2
    },
    profileContainer: {
      alignItems: "center",
      padding: SPACING.space_36,
      marginBottom: -50
    },
    avatarText: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_16,
      marginTop: SPACING.space_16,
      color: COLORS.White
    },
    avatarImage: {
      height: 80,
      width: 80,
      borderRadius: 80,
    },
    buttonBG: {
      alignItems: 'center',
      marginVertical: SPACING.space_10,
    },
    buttonText: {
      borderRadius: BORDERRADIUS.radius_25 * 2,
      paddingHorizontal: SPACING.space_24,
      paddingVertical: SPACING.space_10,
      backgroundColor: COLORS.Orange,
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_14,
      color: COLORS.White,
    },
});

export default UserAccountScreen;