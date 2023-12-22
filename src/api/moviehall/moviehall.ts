import axios from "axios"

const APP_BASE_URL = process.env.APP_URL;

export interface MovieHall {
    hall_name: string;
    latitude: string;
    longitude: string;
}

export const getMovieHall = async () => {
    try{
        const response = await axios.get(`${APP_BASE_URL}/api/moviehall/`);
        return response.data;
    }catch(error: any){
        throw error;
    }
}