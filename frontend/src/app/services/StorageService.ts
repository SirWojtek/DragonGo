import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { combineLatest, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

interface ICreds {
  username: string;
  password: string;
}

const StorageService = {
  loadCredentials(): Observable<ICreds | undefined> {
    return combineLatest(
      from(getItemAsync(USERNAME_KEY)),
      from(getItemAsync(PASSWORD_KEY))
    ).pipe(
      map(([username, password]) => {
        if (!username || !password) {
          return undefined;
        }

        return { username, password };
      })
    );
  },
  saveCredentials(creds?: {
    username?: string;
    password?: string;
  }): Observable<void> {
    if (!creds || !creds.username || !creds.password) {
      return of();
    }

    return from(
      Promise.all([
        setItemAsync(USERNAME_KEY, creds.username),
        setItemAsync(PASSWORD_KEY, creds.password)
      ])
    ).pipe(map(() => {}));
  }
};

export default StorageService;
