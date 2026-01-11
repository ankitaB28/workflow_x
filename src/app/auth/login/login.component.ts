import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]]
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void{}

  isInvalid(form: FormGroup, field: string): boolean{

    return isFieldInvalid(form, field);
  }
}
