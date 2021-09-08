import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
  loginForm: LoginForm = {
    email: 'jdoe@email.com',
    password: 'password'
  }

  constructor(
    private usersService:UsersService,
    public router: Router,
    private _snackBar: MatSnackBar
    ) {
  }

  onSubmitLoginForm(){
    this.usersService.login(this.loginForm.email, this.loginForm.password)
      .subscribe((response) =>{
        localStorage.setItem('token',response.token)
        localStorage.setItem('user',JSON.stringify(response.user));
        this._snackBar.open("✔    Login successful", "", {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right"
        });
        this.router.navigate(['dashboard']);
      }, (error) =>{
        this._snackBar.open("❌    Invalid email or password", "", {
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right"
        });
        console.error(error);
      })
  }


}

export interface LoginForm {
  email: string;
  password: string;
}
