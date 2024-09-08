export interface UserPayload {
    id: number;
    first_name : string;
    last_name : string;
    email : string;
    position: string;
    status: string;
    created_at: string;
    email_verified_at: string;
    updated_at: string;
    profile: IProfile;
}
export interface ILoginPayload {
    status:boolean;
    message: string;
    token: string;
    user: UserPayload;
}
export interface IProfile {
    id: number;
    id_profile : string;
    user_id : number;
    nick_name : string;
    address : string;
    date_of_birth : string;
    gender : string;
    id_image : string;
    id_cover_image : string;
    hashtag : string;
    level_number : number;
    experience_point : number;
    number_stars : number;
    school_name : string;
    class_name : string;
    created_at : string;
    updated_at : string;
}