import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = `${environment.supabaseUrl}users`;

  header: HttpHeaders = new HttpHeaders({
    apikey: environment.supabaseAnonKey,
    authorization: 'Bearer ' + environment.supabaseAnonKey
  });

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    const resObj = this.http.get<User[]>(this.apiUrl, {headers: this.header});
    console.log(resObj);

    return resObj;
  }
}
