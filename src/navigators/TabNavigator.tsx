import React from "react";
import HomeScreen from "../screens/HomeScreen";
import TicketScreen from "../screens/TicketScreen";
import UserAccountScreen from "../screens/UserAccountScreen";
import MapScreen from "../screens/MapScreen";
import { COLORS, SPACING, FONTSIZE } from "../theme/theme";
import CustomIcon from "../components/CustomIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.Black,
                borderTopWidth: 0,
                height: SPACING.space_10 * 10,
            }
        }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused, color, size}) => {
                    return(
                        <View style={[styles.activeTabBackground, focused ? {backgroundColor: COLORS.Orange}: {}]}>
                            <CustomIcon name="video" color={COLORS.White} size={FONTSIZE.size_30} />
                        </View>
                    )
                }
            }}/>
            <Tab.Screen name="Ticket" component={TicketScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused, color, size}) => {
                    return(
                        <View style={[styles.activeTabBackground, focused ? {backgroundColor: COLORS.Orange}: {}]}>
                            <CustomIcon name="ticket" color={COLORS.White} size={FONTSIZE.size_30} />
                        </View>
                    )
                }
            }}/>
            <Tab.Screen name="UserAccount" component={UserAccountScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused, color, size}) => {
                    return(
                        <View style={[styles.activeTabBackground, focused ? {backgroundColor: COLORS.Orange}: {}]}>
                            <CustomIcon name="user" color={COLORS.White} size={FONTSIZE.size_30} />
                        </View>
                    )
                }
            }}/>
            <Tab.Screen name="Map" component={MapScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused, color, size}) => {
                    return(
                        <View style={[styles.activeTabBackground, focused ? {backgroundColor: COLORS.Orange}: {}]}>
                            <MaterialIcons name="map" color={COLORS.White} size={FONTSIZE.size_30} />
                        </View>
                    )
                }
            }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    activeTabBackground: {
        backgroundColor: COLORS.Black,
        padding: SPACING.space_18,
        borderRadius: SPACING.space_18 * 10,
    }
})

export default TabNavigator;