import { getItemAsync, setItemAsync } from 'expo-secure-store';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import userSlice from '../store/slices/userSlice';
import store from '../store/store';

const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

const StorageService = {
  async loadCredentials() {
    const username = await getItemAsync(USERNAME_KEY);
    const password = await getItemAsync(PASSWORD_KEY);
    if (!username || !password) {
      return;
    }

    store.dispatch(
      userSlice.actions.setCredentials({
        username,
        password
      })
    );
  },
  saveCredentials(username: string, password: string): Observable<void> {
    return from(
      Promise.all([
        setItemAsync(USERNAME_KEY, username),
        setItemAsync(PASSWORD_KEY, password)
      ])
    ).pipe(map(() => {}));
  }
};

export default StorageService;
