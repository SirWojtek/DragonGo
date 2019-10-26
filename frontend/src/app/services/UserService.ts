import { Observable, throwError } from 'rxjs';

import { LoginResponse } from '../../../../api/user.api';
import { fetchPostWrapper } from '../utils/fetch-utils';

interface ICreds {
  username?: string;
  password?: string;
}

const UserService = {
  login(creds: ICreds | undefined): Observable<LoginResponse> {
    if (!creds || !creds.username || !creds.password) {
      return throwError({ message: 'Empty username or password' });
    }

    return fetchPostWrapper('/api/users/login', creds);
  }
};

export default UserService;
