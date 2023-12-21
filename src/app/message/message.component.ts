import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  fields: string[] | undefined;

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
    const fields: string[] = [];
    this.visibilityState = { incorrect: false, correct: false, warning: false };
    const controls = this.genericForm?.controls;
    if (!controls) {
      return;
    }

    switch (type) {
      case 'incorrect':
        this.visibilityState.incorrect = true;
        Object.keys(controls).forEach(controlName => {
          const control = controls[controlName];
          if (control?.hasError('required')) {
            fields.push(`${controlName} es requerido`);
          }
          if (controlName === 'phone' && control?.hasError('pattern')) {
            fields.push('phone no valido');
          } else if (controlName === 'email' && control?.hasError('email')) {
            fields.push('email no valido');
          }
        });
        break;

      case 'warning':
        this.visibilityState.warning = true;
        Object.keys(controls).forEach(controlName => {
          const control = this.genericForm?.getRawValue()[controlName];
          if (control == "") {
            fields.push(`${controlName}`);
          }
        });
        break;

      case 'correct':
        this.visibilityState.correct = true;
        break;
    }

    this.fields = fields;
  }
}
