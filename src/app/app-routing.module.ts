import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/job-board',
    pathMatch: 'full',
  },

  {
    path: 'post-job',
    loadChildren: () =>
      import('./pages/post-job/post-job.module').then(
        (m) => m.PostJobPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'job-data',
    loadChildren: () =>
      import('./pages/job-data/job-data.module').then(
        (m) => m.JobDataPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'job-board',
    loadChildren: () =>
      import('./pages/job-board/job-board.module').then(
        (m) => m.JobBoardPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'work-log',
    loadChildren: () =>
      import('./pages/work-log/work-log.module').then(
        (m) => m.WorkLogPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'sign-up/:jobId',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'members',
    loadChildren: () =>
      import('./pages/members/members.module').then((m) => m.MembersPageModule),
  },
  {
    path: 'members/:membershipNumber',
    loadChildren: () =>
      import('./pages/member/member.module').then((m) => m.MemberPageModule),
  },
  {
    path: 'my-hours',
    loadChildren: () =>
      import('./pages/member/member.module').then((m) => m.MemberPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
