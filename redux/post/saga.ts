import {
    getPostRequest,
    getPostSuccess,
    getPostFailure,
} from './actions';
import {call, ForkEffect, put, takeLatest} from 'redux-saga/effects';
import {getPost} from './api';
import { IPostSuccessPayload } from '@/interface/Post';
    
    function* getPostRoomWorker() {
      try {
        const response: IPostSuccessPayload = yield call(getPost);
        if (response !== null) {
          yield put(getPostSuccess(response));
        } else {
          yield put(getPostFailure());
        }
      } catch (e) {
        yield put(getPostFailure());
        console.log(e);
      }
    }
    
    function* postSagas(): Generator<ForkEffect<never>, void> {
      yield takeLatest(getPostRequest.type, getPostRoomWorker);
    }
    export default postSagas;
    