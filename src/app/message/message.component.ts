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

  visibleIncorrect: boolean = false;
  visibleCorrect: boolean = false;
  visibleWarning: boolean = false;

  constructor() {
    this.genericForm?.valueChanges.subscribe(() => {
      this.correctForm;
      console.log(this.visibleCorrect)
    });

  }

  public correctForm(): void {
    if (this.genericForm?.valid) {
      this.visibleCorrect = true;

      console.log(this.genericForm)
    }
  }


}
