import { IPostSuccessPayload } from '@/interface/Post';
import {createAction} from '@reduxjs/toolkit';

export const getPostRequest = createAction(
    'ACTION/GET_POST_REQUEST',
);
export const getPostSuccess = createAction<IPostSuccessPayload>(
    'ACTION/GET_POST_SUCCESS',
);
export const getPostFailure = createAction(
    'ACTION/GET_POST_FAILURE',
);

export const getPostById = createAction<string>(
    'ACTION/GET_POST_BY_ID',
);

