import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = process.env.APP_URL;

export interface Register {
  username: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export const register = async (data: Register) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, data);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const login = async (data: Login) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, data);
    if(response.data.success){
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
    }
    console.log("This is res",response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};
