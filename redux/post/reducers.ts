import { createReducer } from "@reduxjs/toolkit";
import {
    getPostRequest,
    getPostSuccess,
    getPostFailure,
    getPostById,
} from "./actions";
import {IPost} from '@/interface/Post';
interface IinitialState {
  loading: boolean;
    listPost: IPost[];
    idPost : string;
}

const initialState: IinitialState = {
  loading: true,
    listPost: [],
    idPost : ''
};

export const PostReducer = createReducer(initialState, {
    [getPostRequest.type]: (state) => {
        state.loading = true;
    }
    ,
    [getPostSuccess.type]: (state, action) => {
        state.loading = false;
        state.listPost = action.payload.data.data;
    }
    ,
    [getPostFailure.type]: (state) => {
        state.loading = false;
    }
    ,
    [getPostById.type]: (state, action) => {
        state.idPost = action.payload;
    }
    ,
  
});
