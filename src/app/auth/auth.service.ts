import { HttpClient } from '@angular/common/http';
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
    }).pipe(catchError(errorRes=>{
      let errorMessage = "an error occurred";
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS' :
          errorMessage = "This email exists already"
      }
      return throwError(errorMessage);
    }))
  }
}
