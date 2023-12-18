import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  @Input() genericForm: FormGroup | undefined;

  errors: string[] | undefined;

  visibleIncorrect: boolean = false;
  visibleCorrect: boolean = false;
  visibleWarning: boolean = false;

  incorrectFields: string[] | undefined;
  WarningFields: string[] | undefined;


  constructor() {


  }
  ngOnInit(): void {

    console.log(this.genericForm)
    this.genericForm?.valueChanges.subscribe(() => {

      this.correctForm();

    });

  }

  public correctForm(): void {
    console.log(this.genericForm)
    if (this.genericForm?.valid && this.genericForm.touched) {
      if (this.genericForm.getRawValue().selectCountry !== "" && this.genericForm.getRawValue().company !== "") {
        this.visibleCorrect = true;
        this.visibleIncorrect = false;
        this.visibleWarning = false;
      } else {
        this.buildMessageWarning();
        this.visibleIncorrect = false;
        this.visibleCorrect = false;

      }
    } else {
      this.buildMessageIncorrect();
      this.visibleCorrect = false;
      this.visibleWarning = false;
    }
  }

  public buildMessageIncorrect() {

    const fields: string[] = [];
    this.visibleIncorrect = true;
    if (this.genericForm?.get('firstName')?.invalid) {
      fields.push('First Name es requerido');
    }
    if (this.genericForm?.get('lastName')?.invalid) {
      fields.push('Last Name es requerido');
    }
    if (this.genericForm?.get('email')?.hasError('required')) {
      fields.push('email es requerido');
    }
    if (this.genericForm?.get('email')?.hasError('email')) {
      fields.push('email no valido');
    }

    if (this.genericForm?.get('phone')?.hasError('required')) {
      fields.push('phone es requerido');
    }
    if (this.genericForm?.get('phone')?.hasError('pattern')) {
      fields.push('phone no valido');
    }

    if (this.genericForm?.get('termsConditions')?.invalid) {
      fields.push('los terminos y condiciones es requerido');
    }
    if (this.genericForm?.get('privacyPolicy')?.invalid) {
      fields.push('la politica de privacidad es requerido');
    }
    this.incorrectFields = fields;
  }

  public buildMessageWarning() {

    const fields: string[] = [];
    this.visibleWarning = true;
    if (this.genericForm?.getRawValue().selectCountry == "") {
      fields.push('select country');
    }

    if (this.genericForm?.getRawValue().company == "") {
      fields.push('company');
    }
    console.log(fields)
    this.WarningFields = fields;
  }

}
