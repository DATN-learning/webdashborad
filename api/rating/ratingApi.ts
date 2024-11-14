import { apiRoutes } from "@/configs/apiRouters";
import { IRating, IRatingPayLoad } from "@/interface/Rating";
import axiosClient from "@/libs/api/axiosClient";

export const getAllRatings = async () => {
    try{
        const url = apiRoutes.getAllRating;
        const res = await axiosClient.post<IRatingPayLoad>(url);
        return res.data;
    }catch(error){
        throw error;
    }
}