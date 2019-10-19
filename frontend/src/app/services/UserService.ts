import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { LoginResponse, User } from '../../../../api/user.api';

import { getEnv } from '../../environment/environment';
import { jsonHeaders } from '../utils/http-headers';

const env = getEnv();

const UserService = {
  login(creds: {
    username: string;
    password: string;
  }): Observable<LoginResponse> {
    return from(
      fetch(`${env.API_HOST}/api/users/login`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(creds)
      })
    ).pipe(switchMap(res => res.json()));
  }
};

export default UserService;
