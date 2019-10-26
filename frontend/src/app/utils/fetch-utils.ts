import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getEnv } from '../../environment/environment';
import { jsonHeaders } from './http-headers';

const env = getEnv();

const DEFAULT_REQUEST_OPTS: RequestInit = {
  method: 'POST',
  headers: jsonHeaders
};

export function fetchWrapper<ResponseType>(
  uri: string,
  options: RequestInit
): Observable<ResponseType> {
  const opts = {
    ...DEFAULT_REQUEST_OPTS,
    ...options
  };

  const sanitazedUri = uri.startsWith('/') ? uri.substr(1) : uri;

  return from(fetch(`${env.API_HOST}/${sanitazedUri}`, opts)).pipe(
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
