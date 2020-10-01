import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import auth from '../screens/Authentication/reducer';
import bulletins from '../screens/Bulletins/reducers';
import profile from '../screens/Profile/reducers';
import { appRouter } from 'containers/AppRouter/reducer';

export default combineReducers({
  toastr,
  bulletins,
  auth,
  appRouter,
  profile
});
