import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage {

  registerForm: FormGroup = this.formBuilder.group({});
  formErrors: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      selectCountry: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:\d{9}|\d{3}\s\d{3}\s\d{3})$/)]),
      email: new FormControl('', [Validators.email]),
      termsConditions: new FormControl(false, [Validators.requiredTrue]),
      privacyPolicy: new FormControl(false, [Validators.requiredTrue])

    });

    this.registerForm.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.formErrors = this.getFormErrors();
      console.log(this.registerForm);
      console.log(this.formErrors);
    });
  }

  private getFormErrors(): any[] {
    const errors: any[] = [];

    // Recorre los controles del formulario
    Object.keys(this.registerForm.controls).forEach(controlName => {
      const control = this.registerForm.get(controlName);

      // Verifica si el control tiene errores
      if (control && control.errors) {
        // Agrega el objeto completo de errores al array
        errors.push({
          control: controlName,
          errors: control.errors
        });
      }
    });

    // Devuelve el array de objetos de errores
    return errors;
  }

}
