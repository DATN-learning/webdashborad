import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '../reducers';

const selectPost = (state: RootState) => state.post;

export const selectPostList = createSelector(
    selectPost,
    (post) => post.listPost,
);

export const getPostByIDSel = createSelector(
    selectPost,
    (post) => post.idPost,
);