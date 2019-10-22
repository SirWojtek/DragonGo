import { from, Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { LoginResponse } from '../../../../api/user.api';

import { getEnv } from '../../environment/environment';
import { jsonHeaders } from '../utils/http-headers';

const env = getEnv();

interface ICreds {
  username?: string;
  password?: string;
}

const UserService = {
  login(creds: ICreds | undefined): Observable<LoginResponse> {
    if (!creds || !creds.username || !creds.password) {
      return throwError({ message: 'Empty username or password' });
    }

    return from(
      fetch(`${env.API_HOST}/api/users/login`, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(creds)
      })
    ).pipe(
      switchMap(res => res.json()),
      map(res => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return res;
        }
      })
    );
  }
};

export default UserService;
