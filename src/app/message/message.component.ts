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

  visibleIncorrect: boolean = true;
  visibleCorrect: boolean = true;
  visibleWarning: boolean = true;

  constructor() {
    this.genericForm?.valueChanges.subscribe(() => {
    });

  }




}
