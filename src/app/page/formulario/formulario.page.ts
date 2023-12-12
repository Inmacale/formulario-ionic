import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';

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
      selectCountry: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      company: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      termsConditions: new FormControl(false, [Validators.required]),
      privacyPolicy: new FormControl(false, [Validators.required])

    })
  }
}
