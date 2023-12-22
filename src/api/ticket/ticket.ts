import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getUserId } from "../../utils/Helpers";

const APP_BASE_URL = process.env.APP_URL;

export interface Ticket {
    movie_name: any;
    seat_number: any;
    date: any;
    time: any;
    price: any;
}

export const BookTicket = async (data: Ticket) => {
    try{
        const userId = await getUserId();
        const response = await axios.post(`${APP_BASE_URL}/api/booking/bookticket/${userId}`, data)
        console.log("This is ticket data", response.data)
        return response;
    }catch(error: any){
        console.log(error)
    }
}

export const getAllTickets = async () => {
    try{
        const userId = await getUserId();
        const response = await axios.get(`${APP_BASE_URL}/api/booking/alluserticket/${userId}`);
        return response;
    }catch(error: any){
        console.log(error);
    }
}