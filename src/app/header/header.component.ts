import { Component, OnDestroy, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from "../store/app.reducer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService : DataStorageService,
              private authService : AuthService,
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
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.subAuth.unsubscribe();
  }
}

