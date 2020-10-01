import { IBulletin } from './IBulletin';

export interface IBulletinsData {
  total: Number;
  bulletins: Array<IBulletin>;
  isLoaded: boolean;
}
