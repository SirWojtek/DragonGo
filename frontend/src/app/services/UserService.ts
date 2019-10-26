import { Observable, throwError } from 'rxjs';

import { LoginResponse } from '../../../../api/user.api';
import { fetchWrapper } from '../utils/fetch-utils';

interface ICreds {
  username?: string;
  password?: string;
}

const UserService = {
  login(creds: ICreds | undefined): Observable<LoginResponse> {
    if (!creds || !creds.username || !creds.password) {
      return throwError({ message: 'Empty username or password' });
    }

    return fetchWrapper('/api/users/login', {
      body: JSON.stringify(creds)
    });
  }
};

export default UserService;
