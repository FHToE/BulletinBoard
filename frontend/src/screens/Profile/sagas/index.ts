import { all } from 'redux-saga/effects';
import profileSagas from '../containers/ProfilePage/sagas';

export default function* profilePageSagas() {
  yield all([
    profileSagas()
  ]);
}
