import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyHoursPageRoutingModule } from './my-hours-routing.module';

import { MyHoursPage } from './my-hours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyHoursPageRoutingModule
  ],
  declarations: [MyHoursPage]
})
export class MyHoursPageModule {}
