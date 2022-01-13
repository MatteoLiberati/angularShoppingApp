import { Action } from '@ngrx/store';
import { User } from '../user.model';

export interface State {
 user: User;
}

export const initialState: State = {
 user:null,
};

export function authReducer(state = initialState, action: Action): State {
  switch (action.type) {

    default:
      return state;
  }
}
