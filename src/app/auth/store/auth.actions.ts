import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const SINGUP_START = '[Auth] Singup Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERRORS = '[Auth] Clear Errors';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(
    public payload: {
      email: string;
      localId: string;
      idToken: string;
      expiresIn: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class SingupStart implements Action {
  readonly type = SINGUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class ClearErrors implements Action{
  readonly type = CLEAR_ERRORS;
}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | SingupStart
  | ClearErrors;
