import { ILessionByChapterPayLoad } from "./Chapter";

export interface IClassSuccessPayload {
    status: boolean;
    message: string;
    data: {
      class: IClass[];
    };
  }


export interface ISubjectSuccessPayload {
    status: boolean;
    message: string;
    data: {
      class: ISubject[];
    };
  }

export interface ICreateClassPayload {
  status: boolean;
  message: string;
}


export interface ILessionPayLoad {
  status: boolean;
  message: string;
  data: {
    class: ILessionByChapterPayLoad[];
  }
}
export interface ICreateSubjectPayload extends ICreateClassPayload {}
export interface ICreateChapterPayload extends ICreateClassPayload {}
export interface IUpdateChapterPayload extends ICreateClassPayload {}
export interface ICreateLessionPayload extends ICreateClassPayload {}
  export interface IClass {
    id: number;
    id_class_room: string;
    name_class: string;
    class: number;
    slug: string;
    created_at: string;
    updated_at: string;
    subjects: ISubject[];
  }
  export interface ISubject {
    id: number;
    id_subject: string;
    class_room_id: number;
    name_subject: string;
    logo_image: string;
    slug: string;
    created_at: string;
    updated_at: string;
  }


  