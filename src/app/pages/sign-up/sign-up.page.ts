import { Component } from '@angular/core';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { ComponentStore } from '@ngrx/component-store';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { PHONE_NUMBER_REGEX } from '../../util/regex';
import { Observable } from 'rxjs';
import { VolunteerWithContactInfo } from '../../types/job.types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage extends ComponentStore<{ submitted?: boolean }> {
  readonly jobId$ = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('jobId'))
  );

  readonly submitted$ = this.select((state) => state.submitted);

  readonly job$ = this.jobId$.pipe(
    switchMap((jobId) =>
      this.firestoreService.jobBoard$.pipe(
        map((jobs) => jobs.find((job) => job.id === jobId))
      )
    )
  );

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_NUMBER_REGEX)]],
    boatName: ['', [Validators.required]],
  });

  readonly formValues$ = this.form
    .valueChanges as Observable<VolunteerWithContactInfo>;

  readonly volunteerMatchesUser$ = this.select(
    this.formValues$,
    this.authService.userInfo$,
    (formValues, userInfo) =>
      formValues.email !== userInfo.email || formValues.name !== userInfo.name
  );

  readonly vm$ = this.select(
    this.authService.userInfo$,
    this.jobId$,
    this.job$,
    this.firestoreService.boatNames$,
    this.formValues$,
    this.volunteerMatchesUser$,
    this.submitted$,
    (
      userInfo,
      jobId,
      job,
      boats,
      formValues,
      volunteerMatchesUser,
      submitted
    ) => ({
      userInfo,
      jobId,
      job,
      boats,
      formValues,
      volunteerMatchesUser,
      submitted,
    }),
    { debounce: true }
  );

  // *** Effects ***

  readonly submit = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.jobId$, this.formValues$, this.authService.userInfo$),
      map(([, jobId, formValues, userInfo]) => ({
        jobId,
        volunteer: formValues,
        submittedBy: userInfo,
      })),
      tap((signUpData) => {
        this.firestoreService.signUpForJob(signUpData);
        // return console.log(signUpData);
      }),
      tap(() => this.patchState({ submitted: true })),
      tap(() => this.form.disable())
    )
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly firestoreService: FirestoreService,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    super({});
    // this.vm$
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((vm) => console.log('[SignUpPage] vm', vm));

    this.authService.user$.subscribe((user) => {
      this.form.patchValue({
        name: user.displayName,
        email: user.email,
      });
    });
  }
}
