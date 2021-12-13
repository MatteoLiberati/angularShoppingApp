import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    }).pipe(catchError(this.handleError))
  }

  singIn(email:string, password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAW2XVubRa1LLpJPCMXgCCSCX5mA2_qeMY",
    {
      'email' : email,
      'password' : password,
      'returnSecureToken' : true,
    }).pipe(catchError(this.handleError))
  }

  handleError(errorRes : HttpErrorResponse){
    let errorMessage = "an error occurred";
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS' :
        errorMessage = "This email exists already"
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email does not exist."
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "This password is invalid."
        break;
      case 'USER_DISABLED':
        errorMessage = "This user account has been disabled."
    }
    return throwError(errorMessage);
  }
}
