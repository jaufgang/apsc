import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { datePart } from '../../util/date-helpers';
import { jobCategoryOptions } from 'src/app/types/job.types';

const ANY_JOB_CATEGORY = 'Any';

@Component({
  selector: 'app-job-board',
  templateUrl: './job-board.page.html',
  styleUrls: ['./job-board.page.scss'],
})
export class JobBoardPage extends ComponentStore<{
  filters?: { date?: string; category?: string };
}> {
  readonly jobCategoryOptions = [ANY_JOB_CATEGORY, ...jobCategoryOptions];

  // *** Selectors ***

  readonly jobBoard$ = this.firestoreService.jobBoard$.pipe(
    map((jobs) =>
      jobs.map((job) => ({ ...job, date: datePart(job.jobDetails.date) }))
    )
  );

  readonly filters$ = this.select((state) => state.filters);

  readonly filterArray$ = this.filters$.pipe(
    map((filters) =>
      Object.entries(filters ?? {}).map(([key, value]) => ({ key, value }))
    )
  );

  readonly filteredJobs$ = this.select(
    this.jobBoard$,
    this.filterArray$,
    (jobBoard, filters) =>
      jobBoard.filter((job) =>
        filters.every(({ key, value }) => {
          const isMatch = job.jobDetails[key] === value;
          console.log('??', isMatch, key, value, job);
          return isMatch;
        })
      )
  );

  readonly jobDates$ = this.jobBoard$.pipe(
    map((jobs) => new Set(jobs.map((job) => datePart(job.date))))
  );

  readonly dateRange$ = this.jobDates$.pipe(
    map((dates) => [...dates].sort()),
    map((dates) => ({
      min: dates[0],
      max: dates[dates.length - 1],
    }))
  );

  readonly showDateFn$: Observable<(someDate: string) => boolean> =
    this.jobDates$.pipe(
      map((jobDates) => (someDate: string) => jobDates.has(someDate))
    );

  readonly vm$: Observable<unknown> = this.select(
    this.jobBoard$,
    this.jobDates$,
    this.dateRange$,
    this.showDateFn$,
    this.filters$,
    this.filterArray$,
    this.filteredJobs$,
    this.firestoreService.boats$,

    (
      jobBoard,
      jobDates,
      dateRange,
      isDateEnabledCallback,
      filters,
      filterArray,
      filteredJobs,
      boats
    ) => ({
      jobBoard,
      jobDates,
      dateRange,
      isDateEnabledCallback,
      filters,
      filterArray,
      filteredJobs,
      boats,
    })
  );

  // *** Effects ***

  constructor(
    private readonly firestoreService: FirestoreService,
    private readonly router: Router
  ) {
    super({});

    this.vm$.subscribe((vm) => console.log('[JobBoardPage] vm', vm));
    this.state$.subscribe((vm) => console.log('[JobBoardPage] state', vm));
  }

  jobClicked(jobId: string) {
    console.log(jobId);
  }

  setDateFilter(dateFilter: string) {
    this.patchState((state) => ({
      filters: dateFilter
        ? { ...state.filters, date: datePart(dateFilter) }
        : (({ date, ...filters }) => filters)(state.filters ?? {}),
    }));
  }

  setCategoryFilter(categoryFilter: string) {
    this.patchState((state) => ({
      filters:
        categoryFilter !== ANY_JOB_CATEGORY
          ? { ...state.filters, category: categoryFilter }
          : (({ category, ...filters }) => filters)(state.filters ?? {}),
    }));
  }
}
