import { apiRoutes } from "@/configs/apiRouters";
import {
  ICreateChapterPayload,
  ICreateLessionPayload,
  ILessionPayLoad,
  IUpdateChapterPayload,
} from "@/interface/Class";
import { IQuestionSuccessPayload } from "@/interface/Question";
import axiosClient from "@/libs/api/axiosClient";

export const editChapter = async (subject_id: string): Promise<any> => {
  try {
    const data = {
      subject_id,
    };
    const response = await axiosClient.post("/api/classroom/editChapter", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addChapter = async (
  id_chapter_subject: string,
  subject_id: number,
  name_chapter_subject: string,
  chapter_image: any,
  number_chapter: string
) => {
  const formData = new FormData();
  formData.append("id_chapter_subject", id_chapter_subject);
  formData.append("subject_id", subject_id.toString());
  formData.append("name_chapter_subject", name_chapter_subject);
  formData.append("chapter_image", chapter_image);
  formData.append("slug", id_chapter_subject);
  formData.append("number_chapter", number_chapter.toString());
  const response = await axiosClient.post<ICreateChapterPayload>(
    apiRoutes.addChapter,
    formData
  );
  return response;
};

export const updateChapter = async (
  id_chapter_subject: string,
  name_chapter_subject: string,
  number_chapter: number,
  chapter_image?: any
) => {
  const formData = new FormData();
  formData.append("id_chapter_subject", id_chapter_subject);
  formData.append("name_chapter_subject", name_chapter_subject);
  formData.append("number_chapter", number_chapter.toString());
  if (chapter_image) {
    formData.append("chapter_image", chapter_image);
  }
  const response = await axiosClient.post<IUpdateChapterPayload>(
    apiRoutes.editChapterByID,
    formData
  );
  return response;
};

export const deleteChapter = async (id_chapter_subject: string) => {
  const data = {
    id_chapter_subject,
  };
  const response = await axiosClient.post<ICreateChapterPayload>(
    apiRoutes.deleteChapterByID,
    data
  );
  return response;
};

export const addLesson = async (
  id_lesstion_chapter: string,
  chapter_subject_id: number,
  name_lesstion_chapter: string,
  description_lesstion_chapter: string,
  number_lesstion_chapter: string
) => {
  const data = {
    id_lesstion_chapter,
    chapter_subject_id,
    name_lesstion_chapter,
    description_lesstion_chapter,
    number_lesstion_chapter,
  };
  const response = await axiosClient.post<ICreateLessionPayload>(
    apiRoutes.addLession,
    data
  );
  return response;
};


export const deleteLess = async (id_lesstion_chapter: string) => {
  try {
    const data = {id_lesstion_chapter} ;
    const response = await axiosClient.post<ICreateLessionPayload>(apiRoutes.deleteLession,data);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateLess = async (
  id_lesstion_chapter: string,
  name_lesstion_chapter: string,
  description_lesstion_chapter: string,
  number_lesstion_chapter: string
) => {
  const formData = new FormData();
  formData.append("id_lesstion_chapter", id_lesstion_chapter);
  formData.append("name_lesstion_chapter", name_lesstion_chapter);
  formData.append("description_lesstion_chapter", description_lesstion_chapter);
  formData.append("number_lesstion_chapter", number_lesstion_chapter);

  try {
    const response = await axiosClient.post<IUpdateChapterPayload>(
      apiRoutes.updateLession,
      formData
    );
    return response;
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw error;
  }
};

export const getQuestionByID = async (id_question_query: string) => {
  const data = {
    id_question_query,
  };
  const response = await axiosClient.post<IQuestionSuccessPayload>(
    apiRoutes.getQuestionByIDQR,
    data
  );
  return response;
};
