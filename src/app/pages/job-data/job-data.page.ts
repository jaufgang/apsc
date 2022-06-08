import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { ComponentStore } from '@ngrx/component-store';
import { FormBuilder, Validators } from '@angular/forms';
import { jobCategoryOptions } from 'src/app/types/job.types';
import { startWith, tap, withLatestFrom } from 'rxjs/operators';
import { tapLog } from '../../util/operators';
import { JobType } from '../../types/appData.types';

@Component({
  selector: 'app-job-data',
  templateUrl: './job-data.page.html',
  styleUrls: ['./job-data.page.scss'],
})
export class JobDataPage extends ComponentStore<never> {
  readonly jobCategoryOptions = jobCategoryOptions;

  readonly jobTypes$ = this.firestoreService.jobTypes$;

  readonly form = this.fb.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });

  readonly formValues$ = this.form.valueChanges.pipe(startWith(undefined));

  readonly addJob = this.effect(($) =>
    $.pipe(
      withLatestFrom(this.formValues$, this.firestoreService.jobTypes$),
     // tapLog('sub', this),
      tap(([, formValues, jobTypes]) =>
        this.firestoreService.appDataDoc.update({
          types: [...jobTypes, formValues as JobType],
        })
      )
    )
  );

  readonly vm$ = this.select(
    this.jobTypes$,
    this.formValues$,
    (jobTypes, formValues) => ({
      jobTypes,
      formValues,
    })
  );

  constructor(
    private readonly fb: FormBuilder,
    private readonly firestoreService: FirestoreService
  ) {
    super();
   // this.vm$.pipe(tapLog('vm', this)).subscribe();
  }

  dismissPopover() {}
}
