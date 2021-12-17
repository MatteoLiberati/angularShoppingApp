import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData } from './auth-response-data.interface';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  isLoginMode : boolean = true;
  isLoading : boolean = false;
  error : string = null;
  closeSub : Subscription;
  @ViewChild(PlaceholderDirective, {static:false}) alertHost : PlaceholderDirective;

  ngOnInit(): void {
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
        this.authObs = this.authService.singIn(email, password);
      }else{
        this.authObs = this.authService.singUp(email, password);
      }

      this.authObs.subscribe( resData=>{
        console.log(resData);
        this.router.navigate(['/recipes'])
        this.isLoading = false;
      }, errorMessage=>{
        // this.error = errorMessage;
        this.ShowErrorAlert(errorMessage);
        this.isLoading = false;
      });
      form.reset();
    }
  }

  onCloseAlert(){
    this.error = null;
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
  }
}
