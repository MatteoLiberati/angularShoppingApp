import { Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from "../store/app.reducer";
import * as AuthAction from "../auth/store/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService : DataStorageService,
              private store: Store<fromApp.AppState>){}

  private subAuth : Subscription;
  collapsed = true;
  isAuthenticated = false;

  ngOnInit() {
    this.subAuth = this.store.select("auth").pipe(map(userData=> userData.user)).subscribe(user=>{
      this.isAuthenticated = !!user;
    })
  }

  onSaveData(){
    this.dataStorageService.storageData();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.store.dispatch(new AuthAction.Logout());
  }

  ngOnDestroy(): void {
      this.subAuth.unsubscribe();
  }
}

