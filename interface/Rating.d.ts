import { IUser } from "@/models/auth";
import { ILessionPayLoad } from "./Class";
import { ILessionByChapterPayLoad } from "./Chapter";

export interface IRating {
    id: string,
    rating_id: string,
    user_create: IUser,
    lesstion_chapter: ILessionByChapterPayLoad,
    content: string,
    rating: number,
    created_at: string;
    updated_at: string;
}

export interface IRatingPayLoad {
    status: boolean;
    message: string;
    data: {
        rating: IRating[];
    };
}