import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostJobPage } from './post-job.page';

const routes: Routes = [
  {
    path: '',
    component: PostJobPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostJobPageRoutingModule {}
