import { createRoutine } from 'redux-saga-routines';

export const fetchBulletinsRoutine = createRoutine('FETCH_BULLETINS');

export const clearBulletinsStateRoutine = createRoutine('CLEAR_BULLETINS');
