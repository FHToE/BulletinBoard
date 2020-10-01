import { createRoutine } from 'redux-saga-routines';

export const fetchUserInfoRoutine = createRoutine('FETCH_USER');
export const saveUserInfoRoutine = createRoutine('SAVE_USER');
export const addBulletinRoutine = createRoutine('ADD_BULLETIN');
