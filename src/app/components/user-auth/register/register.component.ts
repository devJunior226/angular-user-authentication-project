import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidators } from '../auth-shared/password-match.directive';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { User } from '../interfaces/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerFormGroup = this.formBuilder.group(
    {
      fullname: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.control('', Validators.required),
      confirmPassword: this.formBuilder.control('', Validators.required),
    },
    /**
     * Validators personnalisés
     * ## On associer une fonction au passwordMatchValidators
     */
    { validators: passwordMatchValidators }
  );
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  // fields validation and requirement
  get fullname() {
    return this.registerFormGroup.controls['fullname'];
  }
  get email() {
    return this.registerFormGroup.controls['email'];
  }
  get password() {
    return this.registerFormGroup.controls['password'];
  }
  get confirmPassword() {
    return this.registerFormGroup.controls['confirmPassword'];
  }

  onRegister() {
    const registerData = { ...this.registerFormGroup.value };
    /**
     * Le mot de passe de confirmation n'apparait pas dans la bd;
     * il faut alors de le supprimer avan d'envoyer les données
     */
    delete registerData.confirmPassword;
    this.authService.registerUser(registerData as User).subscribe(
      (response) => {
        // console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Y're registered successfully",
        });
        this.router.navigateByUrl('login');
      },
      (error) => {
        // console.error(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Registering failed',
        });
      }
    );
  }
}
