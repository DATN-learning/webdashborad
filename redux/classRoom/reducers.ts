import { createReducer } from "@reduxjs/toolkit";
import {
  getSubjectClassRoomFailure,
  getSubjectClassRoomRequest,
  getSubjectClassRoomSuccess,
  setClassRoom,
  chooseChapterEBRD,
  chooseSubject,
} from "./actions";
import { IClass } from "@/interface/Class";
interface IinitialState {
  loading: boolean;
  numberClassRoom: number;
  listClass: IClass[];
  subjectEnable: {
    name: string;
    id: string;
    id_relation: number;
  };
  chapterEnable: {
    name: string;
    id: string;
    id_relation: number;
  };
}

const initialState: IinitialState = {
  loading: true,
  numberClassRoom: 6,
  listClass: [],
  subjectEnable: {
    name: "",
    id: "",
    id_relation: -1,
  },
  chapterEnable: {
    name: "",
    id: "",
    id_relation: -1,
  },
};

export const ClassRoomReducer = createReducer(initialState, {
  [getSubjectClassRoomRequest.type]: (state) => {
    state.loading = true;
  },
  [getSubjectClassRoomSuccess.type]: (state, action) => {
    state.listClass = action.payload;
    state.loading = false;
  },
  [getSubjectClassRoomFailure.type]: (state) => {
    state.loading = false;
  },
  [setClassRoom.type]: (state, action) => {
    state.numberClassRoom = action.payload;
  },
  [chooseSubject.type]: (state, action) => {
    state.subjectEnable = {
      name: action.payload.name,
      id: action.payload.id,
      id_relation: action.payload.id_relation,
    };
  },
  [chooseChapterEBRD.type]: (state, action) => {
    state.chapterEnable = {
      name: action.payload.name,
      id: action.payload.id,
      id_relation: action.payload.id_relation,
    };
  },
});
