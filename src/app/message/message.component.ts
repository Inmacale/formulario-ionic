import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  @Input() genericForm: FormGroup | undefined;

  visibleIncorrect: boolean = false;
  visibleCorrect: boolean = false;
  visibleWarning: boolean = false;

  fields: string[] | undefined;

  ngOnInit(): void {

    console.log(this.genericForm)
    this.genericForm?.valueChanges.subscribe(() => {

      this.correctForm();

    });

  }

  public correctForm(): void {

    if (this.genericForm?.valid && this.genericForm.touched) {
      if (this.genericForm.getRawValue().selectCountry !== "" && this.genericForm.getRawValue().company !== "") {
        this.buildMessageCorrect();
      } else {
        this.buildMessageWarning();
      }
    } else {
      this.buildMessageIncorrect();

    }
  }

  public buildMessageIncorrect() {

    const fields: string[] = [];
    this.visibleIncorrect = true;
    const controlsToValidate = ['firstName', 'lastName', 'phone', 'email', 'termsConditions', 'privacyPolicy'];

    controlsToValidate.forEach(controlName => {
      const control = this.genericForm?.get(controlName);
      if (control?.hasError('required')) {
        let errorMessage = `${controlName} es requerido`;
        fields.push(errorMessage);
      }
      if (controlName === 'phone' && control?.hasError('pattern')) {
        const errorMessage = 'phone no valido';
        fields.push(errorMessage);
      } else if (controlName === 'email' && control?.hasError('email')) {
        const errorMessage = 'email no valido';
        fields.push(errorMessage);
      }
    })
    this.visibleCorrect = false;
    this.visibleWarning = false;
    this.fields = fields;
  }

  public buildMessageWarning() {

    const fields: string[] = [];
    this.visibleWarning = true;
    const controlsToValidate = ['selectCountry', 'company'];

    controlsToValidate.forEach(controlName => {
      const control = this.genericForm?.getRawValue()[controlName];
      if (control == "") {
        const warningMessage = `${controlName}`;
        fields.push(warningMessage);
      }
    })
    this.visibleIncorrect = false;
    this.visibleCorrect = false;
    this.fields = fields;
  }

  public buildMessageCorrect() {
    this.visibleCorrect = true;
    this.fields = [];
    this.visibleIncorrect = false;
    this.visibleWarning = false;
  }


}
