import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login (username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('/backend/login', { username, password })
        .subscribe(data => {
          if (data['success'] && data['accessToken']) {
            localStorage.setItem('accessToken', data['accessToken']);
            return resolve();
          }
        }, err => {
          return reject(err);
        });
    });
  }

  logout () {
    localStorage.removeItem('accessToken');
  }

  getToken () {
    return localStorage.getItem('accessToken');
  }
}
