import {
  setClassRoom,
    getSubjectClassRoomRequest,
    getSubjectClassRoomFailure,
    getSubjectClassRoomSuccess,
  } from './actions';
  
  import {call, ForkEffect, put, takeLatest} from 'redux-saga/effects';
  import {getClass} from './api';
import { IClassSuccessPayload } from '@/interface/Class';
  
  function* getClassRoomWorker() {
    try {
      const response: IClassSuccessPayload = yield call(getClass);
      if (response !== null) {
        yield put(getSubjectClassRoomSuccess(response));
      } else {
        yield put(getSubjectClassRoomFailure());
      }
    } catch (e) {
      yield put(getSubjectClassRoomFailure());
      console.log(e);
    }
  }
  
  function* classRoomSagas(): Generator<ForkEffect<never>, void> {
    yield takeLatest(getSubjectClassRoomRequest.type, getClassRoomWorker);
  }
  export default classRoomSagas;
  