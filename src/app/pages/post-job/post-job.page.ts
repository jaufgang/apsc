import { Component } from '@angular/core';
import { jobCategoryOptions } from '../../types/job.types';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import {
  debounceTime,
  map,
  startWith,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { FirestoreService } from '../../services/firestore.service';
import { combineLatest, Observable } from 'rxjs';
import { JobType } from '../../types/appData.types';
import { datePart } from '../../util/date-helpers';

interface FormValues {
  title: string;
  hours: number;
  date: string;
  peopleNeeded: number;
}

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.page.html',
  styleUrls: ['./post-job.page.scss'],
})
export class PostJobPage extends ComponentStore<{ submitted?: boolean }> {
  readonly jobCategoryOptions = jobCategoryOptions;

  readonly submitted$ = this.select((state) => state.submitted);

  readonly form = this.fb.group({
    title: ['', [Validators.required]],
    hours: ['', [Validators.required]],
    date: ['', [Validators.required]],
    peopleNeeded: ['', [Validators.required]],
  });

  //  *** Selectors ***
  readonly formValues$: Observable<FormValues> = this.form.valueChanges.pipe(
    map((formValues) => ({ ...formValues, date: datePart(formValues.date) })),
    startWith(undefined)
  );

  readonly jobTypes$ = this.firestoreService.jobTypes$;

  readonly selectedJobTitle$ = this.formValues$.pipe(
    // filter(Boolean),
    map((formValues) => formValues?.title)
  );

  readonly selectedJob$ = this.select(
    this.selectedJobTitle$,
    this.jobTypes$,
    (selectedJobTitle, jobTypes) =>
      jobTypes.find((jobType) => jobType.title === selectedJobTitle)
  );

  readonly vm$: Observable<{
    formValues: FormValues;
    selectedJob: JobType;
    jobTypes: JobType[];
    submitted: boolean;
  }> = combineLatest([
    this.formValues$,
    this.jobTypes$,
    this.selectedJob$,
    this.submitted$,
  ]).pipe(
    map(([formValues, jobTypes, selectedJob, submitted]) => ({
      formValues,
      jobTypes,
      selectedJob,
      submitted,
    })),
    debounceTime(0)
  );

  // *** Effects ***

  readonly postJob = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.formValues$, this.selectedJob$),
      map(([, { peopleNeeded, ...jobDetails }, selectedJob]) => ({
        peopleNeeded,
        postedJob: {
          ...jobDetails,
          ...selectedJob,
        },
      })),
      tap(() => this.form.disable()),
      tap(({ peopleNeeded, postedJob }) =>
        [...Array(peopleNeeded)].forEach(() =>
          this.firestoreService.postJob(postedJob)
        )
      ),
      tap(() => this.patchState({ submitted: true }))
    )
  );

  readonly resetForm = this.effect(($) =>
    $.pipe(
      tap(() => this.form.reset()),
      tap(() => this.form.enable()),
      tap(() => this.patchState({ submitted: false }))
    )
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly firestoreService: FirestoreService
  ) {
    super({});
    // this.vm$.subscribe((vm) => console.log('vm', vm));
  }
}
