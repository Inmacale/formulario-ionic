import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {

  @Input() genericForm: FormGroup | undefined;

  errors: string[] | undefined;

  constructor() {
    this.genericForm.valueChanges.subscribe(() => {
      this.getFormErrors;
    });

  }

  private getFormErrors(): any[] {
    console.log(this.genericForm);
    const errors: any[] = [];
    if (this.genericForm) {
      // Recorre los controles del formulario
      Object.keys(this.genericForm.controls).forEach(controlName => {
        const control = this.genericForm!.get(controlName);

        // Verifica si el control tiene errores
        if (control && control.errors) {
          // Agrega el objeto completo de errores al array
          errors.push({
            control: controlName,
            errors: control.errors
          });
        }
      });
    }
    // Devuelve el array de objetos de errores
    return errors;
  }



}
