import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from '../../services/auth.service';
import { ComponentStore } from '@ngrx/component-store';
import { filter, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends ComponentStore<never> {
  // *** Effects **
  readonly redirectIfSignedIn = this.effect<boolean>((isSignedIn$) =>
    isSignedIn$.pipe(
      filter(Boolean),
      tap(() => this.router.navigate(['/']))
    )
  );

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    super();
    this.redirectIfSignedIn(this.authService.isSignedIn$);
  }

  login(authType: 'google' | 'facebook') {
    this.authService.signIn(authType);
  }
}
