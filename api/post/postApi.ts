import { apiRoutes } from "@/configs/apiRouters";
import { IGetPostByIdPayload, IPostSuccessPayloadComment } from "@/interface/Post";
import axiosClient from "@/libs/api/axiosClient";

export const getPostByIdApi = async (
    id_post : string,
)  => {
    const data = {
        id_post,
    };
    const response = await axiosClient.post<IGetPostByIdPayload>(apiRoutes.getPostById, data);
    return response;
}

export const getCommentsByPostIdApi = async (
    id_post : string,
    limit : number,
    page : number,
)  => {

    const response = await axiosClient.get<IPostSuccessPayloadComment>(
        `${apiRoutes.getCommentsByPostId}?id_post=${id_post}&limit=${limit}&page=${page}`
    );
    return response;
}