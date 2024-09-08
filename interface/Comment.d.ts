import { IUserCreate } from "./Post";

export interface IComment {
    id: number;
    comment_id : string;
    user_id: number;
    post_id: number;
    title: string;
    body: string;
    approved: number;
    spam : number;
    trash : number;
    notify : number;
    created_at: string;
    updated_at: string;
    images : [];
    timeAgo: string;
    user_create: IUserCreate;
}