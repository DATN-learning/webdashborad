import { apiRoutes } from "@/configs/apiRouters";
import { IGetPostByIdPayload, IPostSuccessPayloadComment } from "@/interface/Post";
import axiosClient from "@/libs/api/axiosClient";

interface ChatbotRequest {
    message: string;
}
  
interface ChatbotResponse {
    response: string;
}

export const Chatbot = async (message: string): Promise<ChatbotResponse> => {
    const data: ChatbotRequest = {
      message: message
    };
    const response = await axiosClient.post<ChatbotResponse>(apiRoutes.chat, data);
    return response.data;
}