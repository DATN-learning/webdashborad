import axiosClient from "@/libs/api/axiosClient";
import { apiRoutes } from "@/configs/apiRouters";
import { ILoginByGmailPayload, ILoginByTokenPayload } from "@/interface/Login";
import { ILogoutPayload } from "@/interface/Logout";

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

export { loginByEmail, loginByToken ,logoutByEmail };
