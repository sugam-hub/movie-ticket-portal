import axios from "axios";

const APP_BASE_URL = process.env.APP_URL;

export interface BookedSeats {
    movie_name: string;
    seat_number: string;
    date: string;
    time: string;
}

export const getBookedSeats = async () => {
    try{
        const response = await axios.get(`${APP_BASE_URL}/api/bookedseats/`);
        return response.data;
    }catch(error: any){
        throw error;
    }
}