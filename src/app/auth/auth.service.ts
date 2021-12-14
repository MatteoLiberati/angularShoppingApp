import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseData } from './auth-response-data.interface';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, 
              private router : Router) { }

  user = new BehaviorSubject<User>(null);

  singUp(email : string, password : string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAW2XVubRa1LLpJPCMXgCCSCX5mA2_qeMY", 
    {
      'email' : email,
      'password' : password,
      'returnSecureToken' : true,
    }).pipe(catchError(this.handleError), tap(resData=>{
      this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }
    ))
  }

  singIn(email:string, password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAW2XVubRa1LLpJPCMXgCCSCX5mA2_qeMY",
    {
      'email' : email,
      'password' : password,
      'returnSecureToken' : true,
    }).pipe(catchError(this.handleError), tap(resData=>{
      this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem("userData"));
    if(!userData){
      return;
    }
    const userLogged = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    this.user.next(userLogged);
  }

  private handleError(errorRes : HttpErrorResponse){
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

  private handleUser(email: string, id:string, token: string, tokenExpiration:number){
    const expirationDate = new Date(new Date().getTime() + tokenExpiration * 1000)
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }

}
