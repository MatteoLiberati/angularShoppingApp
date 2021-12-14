import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth-response-data.interface';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  isLoginMode : boolean = true;
  isLoading : boolean = false;
  error : string = null;

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
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });
      form.reset();
    }
  }
}
