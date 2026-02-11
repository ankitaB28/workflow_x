import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [FormBuilder],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable Login button if form is invalid', () => {
    const form = component.loginForm;
    form.setValue({
      email: '',
      password: '123'
    });

    fixture.detectChanges();

    const btnLogin = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(form.invalid).toBeTrue();
    expect(btnLogin.disabled).toBeTrue();
  });

  // it('should call login on submit when form is valid', () => {
  //   authServiceSpy.login.and.returnValue(of(true));

  //   component.loginForm.setValue({
  //     email: 'test@test.com',
  //     password: '123456'
  //   });

  //   component.submit();

  //   expect(authServiceSpy.login).toHaveBeenCalled();
  // });

  // it('should show error on login failure', () => {
  //   authServiceSpy.login.and.returnValue(throwError(() => 'Invalid credentials'));

  //   component.loginForm.setValue({
  //     email: 'test@test.com',
  //     password: '123456'
  //   });

  //   component.submit();

  //   expect(component.errorMessage).toBe('Invalid credentials');
  // });
});
