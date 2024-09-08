import { IUser } from "../models/auth";
export interface ILoginByGmailPayload{
    status: boolean;
    message: string;
    token: string;
    user: IUser;
}
export interface ILoginByTokenPayload{
    status: boolean;
    message: string;
    user: IUser;
}