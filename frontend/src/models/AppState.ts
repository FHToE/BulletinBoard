import { IBulletinsState } from '@screens/Bulletins/models/IBulletinsState';
import { IAuthState } from '@screens/Authentication/models/IAuthState';
import { IAppRouterState } from '@containers/AppRouter/models/IAppRouterState';
import { IUserState } from '@screens/Profile/models/IUserState';

export interface IAppState {
  toastr: any;
  bulletins: IBulletinsState;
  auth: IAuthState;
  appRouter: IAppRouterState;
  profile: IUserState;
}
