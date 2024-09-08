import { IClassSuccessPayload } from '@/interface/Class';
import {createAction} from '@reduxjs/toolkit';


export const getSubjectClassRoomRequest = createAction(
  'ACTION/GET_SUBJECT_CLASSROOM_REQUEST',
);
export const getSubjectClassRoomSuccess = createAction<IClassSuccessPayload>(
  'ACTION/GET_SUBJECT_CLASSROOM_SUCCESS',
);
export const getSubjectClassRoomFailure = createAction(
  'ACTION/GET_SUBJECT_CLASSROOM_FAILURE',
);

export const setClassRoom = createAction<Number>('ACTION/CHOOSE_CLASSROOM');

export const chooseSubject = createAction<{
  name: string;
  id: string;
  id_relation: number;
}>('ACTION/CHOOSE_SUBJECT');

export const chooseChapterEBRD = createAction<{
  name: string;
  id: string;
  id_relation: number;
}>('ACTION/CHOOSE_CHAPTER');