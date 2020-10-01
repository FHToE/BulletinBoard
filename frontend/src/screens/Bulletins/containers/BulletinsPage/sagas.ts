import { takeEvery, put, call, all } from 'redux-saga/effects';
import { fetchBulletinsRoutine } from 'screens/Bulletins/routines';
import * as bulletinsService from '../../services/bulletins.service';
import { Routine } from 'redux-saga-routines';

function* getBulletins(action: Routine<any>) {
  try {
    const response = yield call(bulletinsService.getBulletins, action.payload);
    yield put(fetchBulletinsRoutine.success(response));
  } catch (error) {
    yield put(fetchBulletinsRoutine.failure(error?.message));
  }
}

function* watchGetBulletinsRequest() {
  yield takeEvery(fetchBulletinsRoutine.TRIGGER, getBulletins);
}

export default function* bulletinsSagas() {
  yield all([
    watchGetBulletinsRequest()
  ]);
}
