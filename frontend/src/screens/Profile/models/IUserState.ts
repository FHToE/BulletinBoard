import { IRequestState } from '@models/IRequestState';
import { IUserData } from './IUserData';

export interface IUserState {
    requests: {
      fetchUserRequest: IRequestState;
      saveUserRequest: IRequestState;
      addBulletinRequest: IRequestState;
    };
    data: IUserData;
}
