import { Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from "../store/app.reducer";
import * as AuthAction from "../auth/store/auth.actions";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>){}

  private subAuth : Subscription;
  collapsed = true;
  isAuthenticated = false;

  ngOnInit() {
    this.subAuth = this.store.select("auth").pipe(map(userData=> userData.user)).subscribe(user=>{
      this.isAuthenticated = !!user;
    })
  }

  onSaveData(){
    this.store.dispatch(new RecipeActions.SaveRecipes());
  }

  onFetchData(){
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout(){
    this.store.dispatch(new AuthAction.Logout());
  }

  ngOnDestroy(): void {
      this.subAuth.unsubscribe();
  }
}

