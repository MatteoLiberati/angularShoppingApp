import { Action } from '@ngrx/store';

export const LOGIN = "[Auth] Login";
export const LOGIN_START = "[Auth] Login Start";
export const LOGOUT = "[Auth] Logout";

export class Login implements Action {
  readonly type = LOGIN;
  constructor(
    public payload :{
      email : string,
      localId : string,
      idToken: string,
      expiresIn: Date
    }
  ){}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload : {email:string, password:string}){}
}


export type AuthActions = Login | Logout;
