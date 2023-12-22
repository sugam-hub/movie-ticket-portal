import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import {decode} from "base-64";

global.atob = decode;

export const hasTokenExpired = async (): Promise<boolean | undefined> => {
    const token: any = await AsyncStorage.getItem("accessToken") as any;
    if(token){
        const decodedToken: any = jwtDecode(token || "");
        if(decodedToken.exp){
            const expireTime: number = decodedToken.exp * 1000;
            const currentTime: number = Date.now();
            const isExpired: boolean = expireTime < currentTime;
            return isExpired;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

export const getUserId = async () => {
    const token: any = await AsyncStorage.getItem("accessToken");
    if(!token){
        return null;
    }
    const decodedToken: any = jwtDecode(token || "")
    return decodedToken.id;
}

export const getUserInfo = async () => {
    const token: any = await AsyncStorage.getItem("accessToken");
    if(!token){
        return null;
    }
    const decodedToken: any = jwtDecode(token || "");
    return decodedToken.data;
}

export const getInfo = async () => {
    const token: any = await AsyncStorage.getItem("accessToken");
    if(!token){
        return null;
    }
    const decodedToken: any = jwtDecode(token || "");
    return decodedToken;
}