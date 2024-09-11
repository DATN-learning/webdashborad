import axiosClient from "@/libs/api/axiosClient";
import { apiRoutes } from "@/configs/apiRouters";
import axiosClientFile from "@/libs/api/axiosClientFile";
import { IChapterSubjectSuccessPayload } from "@/interface/Chapter";
import { ICreateClassPayload, ICreateSubjectPayload, ISubjectSuccessPayload } from "@/interface/Class";

export const getChapterSubject = async (subject_id: string): Promise<any> => {
  try {
    const data = {
      subject_id,
    };
    const response = await axiosClient.post<IChapterSubjectSuccessPayload>(
      apiRoutes.getChapterSubject,
      data
    );
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const addClassApi = async (
  name_class: string,
  number_Class: number,
  slug: string
) => {
  const data = {
    name_class,
    class: number_Class,
    slug,
  };

  const response = await axiosClient.post<ICreateClassPayload>(
    apiRoutes.addClass,
    data
  );
  return response;
};

export const addSubjectApi = async (
  id_subject: string,
  class_room_id: number,
  name_subject: string,
  logo_image: any,
  slug: string
) => {
  const formData = new FormData();
  formData.append("id_subject", id_subject);
  formData.append("class_room_id", class_room_id.toString());
  formData.append("name_subject", name_subject);
  formData.append("logo_image", logo_image);
  formData.append("slug", slug);
  const response = await axiosClientFile.post<ICreateSubjectPayload>(apiRoutes.addSubject, formData);
  return response;
};

export const addSubjectOfChapter = async (
  name_chapter: number,
  description: string | null,
  subject_id: string,
  image: string | null
): Promise<any> => {
  try {
    const data = {
      name_chapter,
      description,
      subject_id,
      image,
    };
    const response = await axiosClient.post("api/class/add", data);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const deleteSubject = async (id_subject: string) => {
  try {
    const data = {id_subject} ;
    const response = await axiosClient.post<ICreateClassPayload>(apiRoutes.deleteSubject,data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateSubjectApi = async (  id_subject: string,
  name_subject: string,
  logo_image: any,
) => {
  const formData = new FormData();
  formData.append("id_subject", id_subject);
  formData.append("name_subject", name_subject);
  formData.append("logo_image", logo_image);
  const response = await axiosClientFile.post<ISubjectSuccessPayload>(apiRoutes.updateSubject, formData);
  return response;
};
