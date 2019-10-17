import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { LoginResponse, User } from '../../../../api/user.api';

import { getEnv } from '../../environment/environment';
import { jsonHeaders } from '../utils/http-headers';

const env = getEnv();

const UserService = {
  fetchUser(): Observable<User> {
    return from(
      fetch(`${env.API_HOST}/api/users/login`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({
          username: 'sirwojtek',
          password: 'alamakota'
        })
      })
    ).pipe(
      switchMap(res => res.json()),
      map((res: LoginResponse) => res.user)
    );
  }
};

export default UserService;
