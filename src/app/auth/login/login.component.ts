import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordStrengthValidator } from 'src/app/shared/validators/passwordStrengthValidator.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]]
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void{}

  isFieldInvalid(field: string): boolean{
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && control.touched);
  }
}
