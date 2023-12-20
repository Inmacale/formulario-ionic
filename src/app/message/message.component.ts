import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

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


  incorrectFields: string[] | undefined;
  WarningFields: string[] | undefined;


  constructor(private toastController: ToastController) {

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

    this.incorrectFields = fields;
    this.presentToastIncorrect(this.incorrectFields);
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
    this.WarningFields = fields;
    this.presentToastWarning(this.WarningFields);
  }


  async presentToastIncorrect(messages: string[]) {
    const listItems = messages;

    const toast = await this.toastController.create({
      message: 'el formulario es incorrecto: ' + this.generateListHTML(listItems),
      duration: 5000,
      position: 'bottom',
      color: 'danger',

    });

    await toast.present();
  }


  async presentToastWarning(messages: string[]) {
    const listItems = messages;

    const toast = await this.toastController.create({
      message: 'el formulario es correcto pero lo siguientes campos están vacios: ' + this.generateListHTML(listItems),
      duration: 5000,
      position: 'bottom',
      color: 'warning',

    });

    await toast.present();
  }



  generateListHTML(items: string[]): string {
    let listHTML = '';
    items.forEach((item) => {
      listHTML += `${item}`;

    });

    return listHTML;

  }




}