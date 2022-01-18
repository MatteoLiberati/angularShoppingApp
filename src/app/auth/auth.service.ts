import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from "../store/app.reducer";
import * as AuthAction from "./store/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store : Store<fromApp.AppState>) { }

  private tokenExpirationTimer : any;

  setLogoutTimer(expirationDuration:number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.store.dispatch(new AuthAction.Logout());
    }, expirationDuration)
  }

  clearLogoutTimer(){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }
}
