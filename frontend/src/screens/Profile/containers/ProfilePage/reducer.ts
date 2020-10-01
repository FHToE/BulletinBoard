import { Routine } from 'redux-saga-routines';
import {
  fetchUserInfoRoutine,
  saveUserInfoRoutine
} from 'screens/Profile/routines';
import { IUserData } from '../../models/IUserData';

const initialState: IUserData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isLoaded: false
};

export const data = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchUserInfoRoutine.SUCCESS:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
        isLoaded: true
      };
    case saveUserInfoRoutine.TRIGGER:
      return {
        ...state,
        isLoaded: false,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
    case saveUserInfoRoutine.SUCCESS:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
        isLoaded: true
      };
    default:
      return state;
  }
};
