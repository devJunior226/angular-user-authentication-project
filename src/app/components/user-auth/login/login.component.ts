import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
  public loginForm = new FormGroup({
    email: new FormControl(''),
    passwd: new FormControl(''),
 })*/
  // Avec FormBuilder
  loginFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  /**
  * this will replace this long syntax in the HTML
  * ngIf="loginFormGroup.controls['email'].invalid && 
    (loginFormGroup.controls['email'].dirty || 
    loginFormGroup.controls['email'].touched)"
  */
  get email() {
    return this.loginFormGroup.controls['email'];
  }

  get password() {
    return this.loginFormGroup.controls['password'];
  }

  onLogin() {
    // On recupere les identifiants de connexion du user
    const { email, password } = this.loginFormGroup.value;
    this.authService.getUserByEmail(email as string).subscribe((response) => {
      if (response.length > 0 && response[0].password === password) {
        sessionStorage.setItem('email', email as string);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Y're logged in successfully",
        });
        this.router.navigate(['home']);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Login failed! email or password is wrong',
        });
      }
    },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Login failed! email or password is wrong',
        });
      }
    );
  }
}
