import { AbstractControl, ValidationErrors } from '@angular/forms';



export function passwordStrengthValidator(field: AbstractControl): ValidationErrors | null{

    const pwd = field?.value;

    if (!pwd) { return null; }

    const hasMinLength = pwd.length >= 8;
    const hasNum = /\d/.test(pwd);
    const hasUpperCase = /[A-Z]/.test(pwd);

    return (hasMinLength && hasNum && hasUpperCase) ? null : {weakPassword: true};

}
