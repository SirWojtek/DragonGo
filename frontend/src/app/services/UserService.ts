import { from, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import { getEnv } from "../../environment/environment";
import { IUser } from "../store/types/IUser";
import { jsonHeaders } from "../utils/http-headers";

const env = getEnv();

const UserService = {
  fetchUser(): Observable<Partial<IUser>> {
    return from(
      fetch(`${env.API_HOST}/api/users/login`, {
        method: "POST",
        headers: jsonHeaders,
        body: JSON.stringify({
          username: "sirwojtek",
          password: "alamakota"
        })
      })
    ).pipe(switchMap(res => res.json()));
  }
};

export default UserService;
