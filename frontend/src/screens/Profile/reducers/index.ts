import { combineReducers } from 'redux';
import {
  fetchUserInfoRoutine,
  saveUserInfoRoutine,
  addBulletinRoutine
} from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/ProfilePage/reducer';

const requests = combineReducers({
  fetchUserRequest: reducerCreator([fetchUserInfoRoutine.TRIGGER]),
  saveUserRequest: reducerCreator([saveUserInfoRoutine.TRIGGER]),
  addBulletinRequest: reducerCreator([addBulletinRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});
