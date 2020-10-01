import { IRequestState } from '@models/IRequestState';
import { IBulletinsData } from './IBulletinsData';

export interface IBulletinsState {
    requests: {
      bulletinsRequest: IRequestState;
    };
    data: IBulletinsData;
}
