import { User } from '../user.model';
import * as AuthActions from '../store/auth.actions';

export interface State {
 user: User;
}

export const initialState: State = {
 user:null,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions ){
  switch (action.type) {
    case AuthActions.LOGIN:
        const user = new User(
          action.payload.email,
          action.payload.localId,
          action.payload.idToken,
          action.payload.expiresIn
        )
        return {
          ...state,
          user : user,
        }
    case AuthActions.LOGOUT:
      return{
        ...state,
        user : null,
      }
    default:
      return state;
  }
}
