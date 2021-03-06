import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData } from './auth-response-data.interface';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private store: Store<fromApp.AppState>) { }

  isLoginMode : boolean = true;
  isLoading : boolean = false;
  error : string = null;
  closeSub : Subscription;
  storeSub : Subscription;
  @ViewChild(PlaceholderDirective, {static:false}) alertHost : PlaceholderDirective;

  ngOnInit(): void {
    this.storeSub = this.store.select("auth").subscribe(authState=>{
      this.isLoading = authState.isLoading;
      this.error = authState.error;
      if(this.error){
        this.ShowErrorAlert(this.error);
      }
    })
  }

  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  authObs : Observable<AuthResponseData>;

  onSubmit(form : NgForm){
    if(form.valid){
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;
      if(this.isLoginMode){
        this.store.dispatch(new AuthActions.LoginStart({email : email, password : password}))
      }else{
        this.store.dispatch(new AuthActions.SingupStart({email : email, password : password}))
      }
      form.reset();
    }
  }

  onCloseAlert(){
    this.store.dispatch(new AuthActions.ClearErrors());
  }

  private ShowErrorAlert(message : string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();
    const componentRef = hostViewContainer.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainer.clear();
    })
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }
}
