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
  keyMessage: string[] | undefined;


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
      this.generateKeyErrors();
    });

    
  }

  private generateKeyErrors() {
    console.log(this.registerForm);
    const keyErrors:string[] = [];
    Object.keys(this.registerForm.controls).forEach(controlName => {
      const control = this.registerForm.get(controlName);
      if(control && control.errors) {
        switch(controlName) {
          case 'selectCountry':
            if(control.errors?.['required']) {
              console.log('entro');
              keyErrors.push('error.selectCounry.required');
            }
            break;
          case 'firstName':
            if(!control.pristine && control.errors?.['required']) {
              keyErrors.push('error.firstName.required');
            }
            break;
          case 'lastName':
            if(!control.pristine && control.errors?.['required']) {
              keyErrors.push('error.lastName.required');
            }
            break;
          case 'company':
            if(!control.pristine && control.errors?.['required']) {
              keyErrors.push('error.company.required');
            }
            break;
        }
      }
    });
    this.keyMessage = keyErrors;
    console.log(this.keyMessage);
  }

}

 


