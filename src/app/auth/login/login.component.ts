import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { isFieldInvalid } from 'src/app/shared/utils/form-utils';
import { passwordStrengthValidator } from 'src/app/shared/validators/passwordStrengthValidator.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]]
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void{
    if (this.loginForm.valid) {
      this.authService.login();
      this.router.navigate(['/layout/dashboard']); // Redirect after login
    }
  }

  isInvalid(form: FormGroup, field: string): boolean{

    return isFieldInvalid(form, field);
  }
}
