import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.jsonUrl;

  constructor(private http: HttpClient) { }

  getUsers(data:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `users?page=${data.page}&limit=${data.limit}`);
  }

  createUser(user: any) {
    return this.http.get(this.baseUrl + `users`, user);
  }

  updateUser(user: any) {
    console.log(user);
    return this.http.put(this.baseUrl +`users/${user.id}`, user);   // or PATCH
  }


  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `users/${id}`);
  }
}
