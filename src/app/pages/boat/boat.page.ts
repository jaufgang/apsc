import { Component } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FirestoreService } from '../../services/firestore.service';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.page.html',
  styleUrls: ['./boat.page.scss'],
})
export class BoatPage extends ComponentStore<never> {
  readonly submittedWork$ = this.firestoreService.submittedWork$;

  readonly selectedBoatName$ = this.route.paramMap.pipe(
    map((params) => params.get('boatName'))
  );

  readonly selectedBoat$ = this.selectedBoatName$.pipe(
    switchMap((boatName) =>
      this.firestoreService.boatsCollection.doc(boatName).valueChanges()
    )
  );

  readonly submittedByBoat$ = combineLatest([
    this.submittedWork$,
    this.selectedBoatName$,
  ]).pipe(
    map(([submittedWork, boatName]) =>
      submittedWork.filter(
        (workItem) => workItem.volunteer.boatName === boatName
      )
    ),
    // tap((w) => console.log('w', w)),
    map((submittedWork) =>
      submittedWork.reduce(
        (acc, job) => ({
          ...acc,
          totalHours: acc.totalHours + job.jobDetails.hours,
          jobs: [...acc.jobs, { ...job }],
        }),
        { totalHours: 0, jobs: [] }
      )
    )
  );

  readonly vm$ = this.select(
    this.selectedBoatName$,
    this.submittedByBoat$,
    this.selectedBoat$,
    (selectedBoatName, submittedByBoat, selectedBoat) => ({
      selectedBoatName,
      submittedByBoat,
      selectedBoat,
    })
  );

  constructor(
    private readonly firestoreService: FirestoreService,
    private readonly route: ActivatedRoute
  ) {
    super();

    // this.vm$.subscribe((vm) => console.log('vm', vm));
    // this.selectedBoatName$.subscribe((boat) => console.log('boatName', boat));
    // this.selectedBoatName2$.subscribe((boat) => console.log('boatName2', boat));
    // this.selectedBoat$.subscribe((boat) => console.log('Boat', boat));
    // this.submittedWork$.subscribe((submittedWork) =>
    //   console.log('submittedWork', submittedWork)
    // );
    // this.submittedByBoat$.subscribe((submittedByBoat) =>
    //   console.log('submittedByBoat', submittedByBoat)
    // );
  }
}
