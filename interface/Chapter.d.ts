export interface IChapterSubjectSuccessPayload{
  status: boolean;
  message: string;
  data: {
    chapter: IChapterSubject[];
  };
}

export interface IChapterSubject {
  id: number;
  id_chapter_subject: string;
  subject_id: number;
  name_chapter_subject: string;
  chapter_image: string;
  slug: string;
  created_at: string;
  updated_at: string;
  number_chapter: number;
  lessions : ILessionByChapterPayLoad[];
}

export interface ILessionByChapterPayLoad {
  id: number;
  id_lesstion_chapter: string;
  chapter_subject_id: number;
  name_lesstion_chapter: string;
  description_lesstion_chapter : string;
  number_lesstion_chapter: number;
  created_at: string;
  updated_at: string;
}

export interface IEditChapterPayload  {
  status: boolean;
  message: string;
  data: {
    chapter: IEditChapter;
  };
};

export interface IEditChapter {
    
}

