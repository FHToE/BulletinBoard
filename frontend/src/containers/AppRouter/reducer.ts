import { IAppRouterState } from './models/IAppRouterState';
import { IUser } from './models/IUser';
import { Routine } from 'redux-saga-routines';
import { fetchUserToLoginRoutine } from './routines';
import { setNoAuthorizedRoutine } from '@screens/Authentication/routines';

const initialState: IAppRouterState = {
  user: { } as IUser,
  userLoading: true
};

export const appRouter = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchUserToLoginRoutine.SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userLoading: false
      };
    }
    case fetchUserToLoginRoutine.FAILURE: {
      return {
        ...state,
        userLoading: false
      };
    }
    case setNoAuthorizedRoutine.TRIGGER: {
      return {
        ...state,
        user: {}
      };
    }
    default: {
      return state;
    }
  }
};
