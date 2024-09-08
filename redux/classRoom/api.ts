import axios from 'axios';
import axiosClient from '../../libs/api/axiosClient';
import { apiRoutes } from '@/configs/apiRouters';
import { IClassSuccessPayload } from '@/interface/Class';
export const getClass = async () => {
  try {
    const response = await axiosClient.get<IClassSuccessPayload>(apiRoutes.getClassRoom);
    return response.data.data.class;
  } catch (error) {
    console.log(error);
  }
};
