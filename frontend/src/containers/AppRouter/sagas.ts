import { all, call, put, takeEvery } from 'redux-saga/effects';
import { IUser } from './models/IUser';
import * as appRouterService from './service';
import { fetchUserToLoginRoutine } from './routines';
import { loginRoutine } from '@screens/Authentication/routines';


function* getCurrentUser() {
  try {
    const result: IUser = yield call(appRouterService.getCurrentUser);
    yield put(fetchUserToLoginRoutine.success(result));
    yield put(loginRoutine.success());
  } catch (error) {
    yield put(fetchUserToLoginRoutine.failure(error?.message));
  }
}

function* watchGetCurrentUser() {
  yield takeEvery(fetchUserToLoginRoutine.TRIGGER, getCurrentUser);
}
export default function* appRouterSagas() {
  yield all([
    watchGetCurrentUser()
  ]);
}
