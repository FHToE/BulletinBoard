import { takeEvery, put, call, all } from 'redux-saga/effects';
import {
  fetchUserInfoRoutine,
  saveUserInfoRoutine,
  addBulletinRoutine
} from 'screens/Profile/routines';
import { fetchBulletinsRoutine } from 'screens/Bulletins/routines';
import * as profileService from '../../services/profile.service';
import * as imageService from 'services/image.service';
import { toastr } from 'react-redux-toastr';
import { Routine } from 'redux-saga-routines';

function* fetchUser() {
  try {
    const response = yield call(profileService.getUserInfo);
    yield put(fetchUserInfoRoutine.success(response));
  } catch (error) {
    yield put(fetchUserInfoRoutine.failure(error?.message));
  }
}

function* watchFetchUserRequest() {
  yield takeEvery(fetchUserInfoRoutine.TRIGGER, fetchUser);
}


function* saveUserInfo(action: Routine<any>) {
  try {
    const response = yield call(profileService.updateUserInfo, action.payload);
    yield put(saveUserInfoRoutine.success(response));
    yield put(fetchBulletinsRoutine(0));
    toastr.success('Profile updated!');
  } catch (error) {
    toastr.error(`User with email ${action.payload.email} already registered`);
    yield put(saveUserInfoRoutine.failure(error?.message));
  }
}

function* watchSaveUserInfoRequest() {
  yield takeEvery(saveUserInfoRoutine.TRIGGER, saveUserInfo);
}

function* addBulletin(action: Routine<any>) {
  try {
    const bulletin = action.payload;
    if (bulletin?.image) {
      const { id } = yield call(imageService.uploadImage, bulletin.image);
      bulletin.imageId = id;
    }
    bulletin.image = undefined;
    const result = yield call(profileService.addBulletin, bulletin);
    yield put(fetchBulletinsRoutine(0));
    if (result) {
      toastr.success('Bulletin added!');
      profileService.forwardBulletins();
    }
  } catch (error) {
    yield put(addBulletinRoutine.failure(error?.message));
  }
}

function* watchAddBulletinRequest() {
  yield takeEvery(addBulletinRoutine.TRIGGER, addBulletin);
}

export default function* profileSagas() {
  yield all([
    watchSaveUserInfoRequest(),
    watchFetchUserRequest(),
    watchAddBulletinRequest()
  ]);
}
