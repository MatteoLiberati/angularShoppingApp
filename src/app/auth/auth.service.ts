import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from './auth-response-data.interface';
import { User } from './user.model';
import * as fromApp from "../store/app.reducer";
import * as AuthAction from "./store/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router : Router,
              private store : Store<fromApp.AppState>) { }

  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer : any;

  singUp(email : string, password : string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseAPIkey,
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
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebaseAPIkey,
    {
      'email' : email,
      'password' : password,
      'returnSecureToken' : true,
    }).pipe(catchError(this.handleError), tap(resData=>{
      this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }))
  }

  logout(){
    this.store.dispatch(new AuthAction.Logout());
    // this.user.next(null);
    this.router.navigate(['/auth']);
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
    if(localStorage.getItem("userData")){
      localStorage.removeItem("userData");
    }
  }

  autoLogout(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    }, expirationDuration)
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem("userData"));
    if(!userData){
      return;
    }
    // const userLogged = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    this.store.dispatch(new AuthAction.AuthenticateSuccess({email: userData.email, localId: userData.id, idToken: userData._token, expiresIn : new Date(userData._tokenExpirationDate)}));
    // this.user.next(userLogged);
    const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
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
    this.store.dispatch(new AuthAction.AuthenticateSuccess({email: email, localId: id, idToken: token, expiresIn : expirationDate}));
    // this.user.next(user);
    this.autoLogout(tokenExpiration * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

}
