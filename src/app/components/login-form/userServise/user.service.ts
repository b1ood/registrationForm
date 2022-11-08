import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  postData(user: User) {
    const body = {name: user.username, password: user.password};
    return this.http.post('http://localhost:3000/postuser', body,
      {observe: 'response'}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  userRegistration(user: User) {
    const body = {name: user.username, password: user.password};
    return this.http.post('http://localhost:3000/putuser', body,
      {observe: 'response'}).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
