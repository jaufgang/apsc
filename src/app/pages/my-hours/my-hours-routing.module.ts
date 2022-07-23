import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyHoursPage } from './my-hours.page';

const routes: Routes = [
  {
    path: '',
    component: MyHoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyHoursPageRoutingModule {}
