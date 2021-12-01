import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from './auth-response-data.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  singUp(email : string, password : string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAW2XVubRa1LLpJPCMXgCCSCX5mA2_qeMY", 
    {
      'email' : email,
      'password' : password,
      'returnSecureToken' : true,
    })
  }
}
