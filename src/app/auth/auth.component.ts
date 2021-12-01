import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }
  isLoginMode : boolean = true;

  ngOnInit(): void {
  }

  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm){
    if(this.isLoginMode){

    }else{
      if(form.valid){
        const email = form.value.email;
        const password = form.value.password
        this.authService.singUp(email, password).subscribe( resData=>{
          console.log(resData);
        }, error=>{
          console.log(error);
        });
      }
    }
    form.reset();
  }

}
