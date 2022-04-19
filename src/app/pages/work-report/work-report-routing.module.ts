import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkReportPage } from './work-report.page';

const routes: Routes = [
  {
    path: '',
    component: WorkReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkReportPageRoutingModule {}
