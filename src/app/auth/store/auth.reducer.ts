import { User } from '../user.model';
import * as AuthActions from '../store/auth.actions';

export interface State {
  user: User;
  isLoading: boolean,
  error : string,
}

export const initialState: State = {
  user: null,
  isLoading: false,
  error : null,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.localId,
        action.payload.idToken,
        action.payload.expiresIn
      );
      return {
        ...state,
        user: user,
        isLoading: false,
        error : null,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false,
        error : null,
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        user: null,
        isLoading: true,
        error : null,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isLoading: false,
        error : action.payload,
      };
    default:
      return state;
  }
}
