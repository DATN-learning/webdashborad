import { IComment } from "./Comment";
import { IImage } from "./Image";
import { ILinkPagination } from "./LinkPagination";

export interface IPostSuccessPayload {
    status: boolean;
    message: string;    
    data : {
        current_page : number;
        data : IPost[];
        first_page_url : string;
        from : number;
        last_page : number;
        last_page_url : string;
        links : ILinkPagination[];
        next_page_url : string;
        path : string;
        per_page : number;
        prev_page_url : string|null;
        to : number;
        total : number;

    }
}

export interface IPostSuccessPayloadComment extends IPostSuccessPayload {
    data : {
        current_page : number;
        data : IComment[];
        first_page_url : string;
        from : number;
        last_page : number;
        last_page_url : string;
        links : ILinkPagination[];
        next_page_url : string;
        path : string;
        per_page : number;
        prev_page_url : string|null;
        to : number;
        total : number;
    }
}


export interface IPost {
    id: number;
    id_post: string;
    user_id: number;
    title: string;
    description: string;
    class_room_id: number;
    subject_id: number;
    created_at: string;
    updated_at: string;
    images: IImage[];
    timeAgo: string;
    user_create: IUserCreate;
}

export interface IUserCreate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: string;
  position: string;
  status: string;
  created_at: string;
  updated_at: string;
  avatar: string;
}


export interface IPostById extends IPost {
  classNumber : string;
  subjectName : string;
}

export interface IGetPostByIdPayload {
    status: boolean;
    message: string;
    data: IPostById;
}