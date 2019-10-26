import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getEnv } from '../../environment/environment';
import { jsonHeaders } from './http-headers';

const env = getEnv();

export function fetchPostWrapper<ResponseType>(
  uri: string,
  body: any,
  accessToken?: string
): Observable<ResponseType> {
  const headers = new Headers(jsonHeaders);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const opts = {
    method: 'POST',
    body: JSON.stringify(body),
    headers
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
