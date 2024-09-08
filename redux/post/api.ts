import { IPostSuccessPayload } from '@/interface/Post';
import axiosClient from '../../libs/api/axiosClient';
import { apiRoutes } from '@/configs/apiRouters';
export const getPost = async () => {
  try {
    const response = await axiosClient.get<IPostSuccessPayload>(apiRoutes.getPost);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
