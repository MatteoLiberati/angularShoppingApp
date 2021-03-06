import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../auth-response-data.interface';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}

  authSingup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SINGUP_START),
      switchMap((authData: AuthActions.SingupStart) =>
        this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.firebaseAPIkey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap(resData=>{
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(resData);
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          )
      )
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) =>
        this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAPIkey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap(resData=>{
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              return handleAuthentication(resData);
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          )
      )
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authenticateSuccess : AuthActions.AuthenticateSuccess ) => {
          if(authenticateSuccess.payload.redirect){
            this.router.navigate(['/']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
          const userData = JSON.parse(localStorage.getItem('userData'));
          if (!userData) {
            return {type: "DUMMY"};
          }
          const userLogged = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
            );
          if (userLogged.token) {
            const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration);

            return new AuthActions.AuthenticateSuccess({
              email: userLogged.email,
              localId: userLogged.id,
              idToken: userLogged.token,
              expiresIn: new Date(userData._tokenExpirationDate),
              redirect : false,
            });
          }
          return {type: "DUMMY"};
        })
      ),
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.router.navigate(['/auth']);
          this.authService.clearLogoutTimer();
          if (localStorage.getItem('userData')) {
            localStorage.removeItem('userData');
          }
        })
      ),
    { dispatch: false }
  );
}

const handleAuthentication = (resData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );

  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    localId: resData.localId,
    idToken: resData.idToken,
    expiresIn: expirationDate,
    redirect : true,
  });
};

const handleError = (errorRes) => {
  let errorMessage = 'an error occurred';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is invalid.';
      break;
    case 'USER_DISABLED':
      errorMessage = 'This user account has been disabled.';
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};
