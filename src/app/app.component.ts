import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ComponentStore } from '@ngrx/component-store';
import { FirestoreService } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends ComponentStore<any> {
  public readonly appPages = [
    {
      title: 'Members',
      pages: [
        { title: 'Job Board', url: '/job-board', icon: 'list-circle' },
        {
          title: 'Log My Hours',
          url: '/work-log',
          icon: 'document-text',
        },
      ],
    },
    {
      title: 'Admin',
      pages: [
        { title: 'Job Descriptions', url: '/job-data', icon: 'list-circle' },

        { title: 'Post A Job', url: '/post-job', icon: 'list-circle' },
        { title: 'Boats', url: '/boats', icon: 'list-circle' },
      ],
    },
  ];

  readonly vm$ = this.select(
    this.authService.isSignedInAndVerified$,
    this.authService.userInfo$,
    this.firestoreService.currentUser$,
    (isSignedIn, userInfo, currentUser) => ({
      isSignedIn,
      userInfo,
      currentUser,
    })
  );

  constructor(
    private readonly authService: AuthService,
    private readonly firestoreService: FirestoreService
  ) {
    super({});

    this.vm$.subscribe((vm) => console.log('[AppComponent] vm', vm));
  }

  logout() {
    this.authService.signOut();
  }
}
