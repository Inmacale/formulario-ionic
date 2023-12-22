import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioPageRoutingModule } from './formulario-routing.module';

import { FormularioPage } from './formulario.page';
import { MessageComponent } from 'src/app/message/message.component';
import { BorderStatusDirective } from 'src/app/border-status.directive';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioPageRoutingModule,
    ReactiveFormsModule,




  ],
  declarations: [FormularioPage, MessageComponent, BorderStatusDirective]
})
export class FormularioPageModule { }