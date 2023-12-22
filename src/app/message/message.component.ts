import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  @Input() genericForm: FormGroup | undefined;

  visibilityState = {
    incorrect: false,
    correct: false,
    warning: false,
  };

  fields: string[] = [];

  ngOnInit(): void {
    console.log(this.genericForm);
    this.genericForm?.valueChanges.subscribe(() => {
      this.correctForm();
    });
  }

  public correctForm(): void {
    if (this.genericForm?.valid && this.genericForm.touched) {
      if (this.genericForm.getRawValue().selectCountry !== "" && this.genericForm.getRawValue().company !== "") {
        this.buildMessage('correct');
      } else {
        this.buildMessage('warning');
      }
    } else {
      this.buildMessage('incorrect');
    }
  }

  private buildMessage(type: 'correct' | 'warning' | 'incorrect'): void {

    this.visibilityState = { incorrect: false, correct: false, warning: false };
    this.visibilityState[type] = true;
    const controls = this.genericForm?.controls;
    if (!controls) {
      return;
    }
    this.fields = [];

    Object.keys(controls).forEach(controlName => {
      if (type == 'incorrect') {
        const control = controls[controlName];
        if (control?.hasError('required')) {
          this.fields.push(`${controlName} es requerido`);
        }
        if (controlName === 'phone' && control?.hasError('pattern')) {
          this.fields.push('phone no valido');
        } else if (controlName === 'email' && control?.hasError('email')) {
          this.fields.push('email no valido');
        }
      } else if (type == 'warning') {
        const control = this.genericForm?.getRawValue()[controlName];
        if (control == "") {
          this.fields.push(`${controlName}`);
        }
      }
    });

  }

}
