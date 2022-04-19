import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobDataPage } from './job-data.page';

const routes: Routes = [
  {
    path: '',
    component: JobDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobDataPageRoutingModule {}
