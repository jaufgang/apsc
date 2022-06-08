import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoatPage } from './boat.page';

const routes: Routes = [
  {
    path: '',
    component: BoatPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoatPageRoutingModule {}
