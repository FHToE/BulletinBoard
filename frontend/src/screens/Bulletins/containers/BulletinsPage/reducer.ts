import { Routine } from 'redux-saga-routines';
import { fetchBulletinsRoutine, clearBulletinsStateRoutine } from 'screens/Bulletins/routines';
import { IBulletinsData } from '../../models/IBulletinsData';

const initialState: IBulletinsData = {
  total: 10,
  bulletins: [],
  isLoaded: false
};

export const data = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchBulletinsRoutine.SUCCESS:
      return {
        ...state,
        total: action.payload.total,
        bulletins: action.payload.bulletins,
        isLoaded: true
      };
    case fetchBulletinsRoutine.TRIGGER:
      return {
        ...state,
        isLoaded: false
      };
    case clearBulletinsStateRoutine.TRIGGER:
      return {
        ...state,
        total: 10,
        bulletins: [],
        isLoaded: false
      };
    default:
      return state;
  }
};
