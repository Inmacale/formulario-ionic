import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage {

  registerForm: FormGroup = this.formBuilder.group({});



  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group({
      selectCountry: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      company: new FormControl(''),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:\d{9}|\d{3}\s\d{3}\s\d{3})$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      termsConditions: new FormControl(false, [Validators.requiredTrue]),
      privacyPolicy: new FormControl(false, [Validators.requiredTrue])
    });
  }



  isRequired(key: string): string {
    return this.registerForm.get(key)?.hasValidator(Validators.required) ? ' (required)' : '';
  }
}



