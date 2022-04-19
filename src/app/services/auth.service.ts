import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ComponentStore } from '@ngrx/component-store';
import { map, switchMap, tap } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { EmptyObject } from '../types/util.types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ComponentStore<EmptyObject> {
  // *** Selectors

  readonly user$ = this.auth.authState;

  readonly isSignedIn$ = this.user$.pipe(map((user) => !!user));

  readonly userInfo$ = this.user$.pipe(
    map((user) => ({
      name: user?.displayName,
      email: user?.email,
    }))
  );

  readonly userEmail$ = this.userInfo$.pipe(map(({ email }) => email));

  readonly userName$ = this.userInfo$.pipe(map(({ name }) => name));

  //  *** Effects ***

  readonly signIn = this.effect<'google' | 'facebook'>((authProvider$) =>
    authProvider$.pipe(
      map((authProviderType) =>
        authProviderType === 'google'
          ? new firebase.auth.GoogleAuthProvider()
          : authProviderType === 'facebook'
          ? new firebase.auth.FacebookAuthProvider()
          : undefined
      ),
      switchMap((authProvider) => this.auth.signInWithRedirect(authProvider))
    )
  );

  readonly signOut = this.effect(($) =>
    $.pipe(
      switchMap(() => this.auth.signOut()),
      tap(() => {
        this.router.navigate(['login']);
      })
    )
  );

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly router: Router
  ) {
    super({});

    this.auth.authState.subscribe((authState) =>
      console.log('[AuthService] authState', authState)
    );

    this.state$.subscribe((state) =>
      console.log('[AuthService], state', state)
    );
  }
}
