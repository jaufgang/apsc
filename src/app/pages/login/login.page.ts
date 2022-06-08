import { Component } from '@angular/core';
import { AuthService, UserInfo } from '../../services/auth.service';
import { ComponentStore } from '@ngrx/component-store';
import { delay, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends ComponentStore<never> {
  // *** Selectors **

  readonly vm$: Observable<{ userInfo: UserInfo }> = this.select(
    this.authService.userInfo$,
    (userInfo) => ({
      userInfo,
    })
  );

  // *** Effects ***

  readonly initializeForm = this.effect<UserInfo>((userInfo$) =>
    userInfo$.pipe(
      filter((userInfo) => !userInfo.email),
      delay(0),
      tap(() => this.authService.fbui('#firebaseui-auth-container'))
    )
  );

  readonly redirectIfSignedIn = this.effect<boolean>((isSignedIn$) =>
    isSignedIn$.pipe(
      filter(Boolean),
      tap(() => this.router.navigate(['/']))
    )
  );

  readonly sendEmailVerification = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.authService.user$),
      map(([, user]) => user.sendEmailVerification())
    )
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    super();
    this.redirectIfSignedIn(this.authService.isSignedInAndVerified$);
    this.initializeForm(this.authService.userInfo$);

    // this.vm$.subscribe((vm) => console.log('vm', vm));
  }

  verified() {
    window.location.reload();
  }
}
