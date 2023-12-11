import React from 'react';
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';

const UserAccountScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
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
      </View>

      <View style={styles.profileContainer}>
        <SettingComponent icon="user" heading="Account" subheading="Edit Profile" subtitle="Change Password" />
        <SettingComponent icon="setting" heading="Setting" subheading="Theme" subtitle="Permissions" />
        <SettingComponent icon="dollar" heading="Offers and Referrals" subheading="Offer" subtitle="Referrals" />
        <SettingComponent icon="info" heading="About" subheading="About Movies" subtitle="more" />
      </View>
    </View>
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
});

export default UserAccountScreen;