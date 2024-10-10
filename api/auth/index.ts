import axiosClient from "@/libs/api/axiosClient";
import { apiRoutes } from "@/configs/apiRouters";
import { ILoginByGmailPayload, ILoginByTokenPayload } from "@/interface/Login";
import { ILogoutPayload } from "@/interface/Logout";
import { ILoginPayload, UserPayload } from "@/models/login";

const loginByEmail = (email : string , password : string) => {
    const data = {
        email,
        password
    }

    const response = axiosClient.post<ILoginByGmailPayload>(
        apiRoutes.authLogin,
        data
    )
    return response
}
        
const loginByToken = (token : string) => {
    const data = {
        token
    }
    const response = axiosClient.post<ILoginByTokenPayload>(
        apiRoutes.loginByToken ,
        data
    )
    return response
}

const logoutByEmail = (email : string ) => {
    const data = {
        email,
    }

    const response = axiosClient.post<ILogoutPayload>(apiRoutes.authLogout, data)
    return response
}

const getAllUsers = async (): Promise<UserPayload[]> => {
  try {
    const response = await axiosClient.get<{ data: UserPayload[] }>(apiRoutes.getAllUsers);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; 
  }
};

const deleteUserByProfileId = (id_profile : string ) => {
    const data = {
        id_profile,
    }

    const response = axiosClient.post<UserPayload>(apiRoutes.deleteUserByProfileId, data)
    return response
}

export { loginByEmail, loginByToken ,logoutByEmail,getAllUsers,deleteUserByProfileId };
