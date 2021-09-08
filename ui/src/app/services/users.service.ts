import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  loginUrl = 'http://localhost:3690/auth/login';
  corsHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3690/'
    });
  }


  login(email: string, password: string) {
    return this.http.post<LoginResponse>(this.loginUrl,{ email, password }, { headers: this.corsHeaders });
  }

}

export interface User {
  userId: number;
  name: string;
  userName: string;
  email: string;
  isEmailVerified: number;
  status: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface LoginResponse {
  user: User;
  token: string;
}
