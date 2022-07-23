import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.userInfo$.pipe(
      map((userInfo) => !!userInfo?.emailVerified),
      tap((isSignedInAndVerified) => {
        if (!isSignedInAndVerified) {
          void this.router.navigate(['login']);
        }
      })
    );
  }
}
