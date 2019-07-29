import {Observable, of} from 'rxjs';

import {IUser} from '../store/types/IUser';
import {user} from './data/user';

const UserService = {
  fetchUser(): Observable<Partial<IUser>> {
    return of(user);
  },
};

export default UserService;
