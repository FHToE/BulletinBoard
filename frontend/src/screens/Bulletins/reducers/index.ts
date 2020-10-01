import { combineReducers } from 'redux';
import { fetchBulletinsRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/BulletinsPage/reducer';

const requests = combineReducers({
  bulletinsRequest: reducerCreator([fetchBulletinsRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});
