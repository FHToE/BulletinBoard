import { all } from 'redux-saga/effects';
import authSagas from '../screens/Authentication/sagas';
import appRouterSagas from 'containers/AppRouter/sagas';
import bulletinsSagas from '../screens/Bulletins/sagas';
import profilePageSagas from '../screens/Profile/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    appRouterSagas(),
    bulletinsSagas(),
    profilePageSagas()
  ]);
}
