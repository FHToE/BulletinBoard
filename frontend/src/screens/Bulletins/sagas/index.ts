import { all } from 'redux-saga/effects';
import bulletinsSagas from '../containers/BulletinsPage/sagas';

export default function* bulletinsPageSagas() {
  yield all([
    bulletinsSagas()
  ]);
}
