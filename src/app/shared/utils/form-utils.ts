import { FormGroup } from '@angular/forms';



export function isFieldInvalid(form: FormGroup, field: string): boolean{
    const control = form.get(field);

    return !!(control && control.invalid && control.touched);
}
