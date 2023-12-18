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
      if (this.genericForm.getRawValue().company !== "") {
        this.visibleCorrect = true;
        this.visibleIncorrect = false;
        this.visibleWarning = false;
      } else {
        this.visibleWarning = true;
        this.visibleIncorrect = false;
        this.visibleCorrect = false;

      }
    } else {
      this.visibleIncorrect = true;
    }
  }


}
