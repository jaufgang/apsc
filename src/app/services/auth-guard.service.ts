import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.isSignedIn$.pipe(
      tap((isSignedIn) => {
        if (!isSignedIn) {
          console.log('redirecting');
          void this.router.navigate(['login']);
        }
      })
    );
  }
}
