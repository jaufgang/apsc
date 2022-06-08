import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AppData } from '../types/appData.types';
import { MemberInfo } from '../types/auth.types';
import {
  Job,
  JobBoardJob,
  PostedJobDetails,
  SignedUpJobBoardJob,
  UserInitiatedJob,
  Volunteer,
} from '../types/job.types';
import { AppService } from './app.service';

const USERS_COLLECTION_ID = 'Users';
const BOATS_COLLECTION_ID = 'Boats';
const JOB_BOARD_COLLECTION_ID = 'Jobs';
const APP_DATA_COLLECTION_ID = 'AppData';
const APP_DATA_DOC_ID = 'Jobs';

interface User {
  isAdmin: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class FirestoreService extends ComponentStore<never> {
  // *** Selectors ***

  readonly usersCollection =
    this.firestore.collection<User>(USERS_COLLECTION_ID);

  readonly currentUserDoc$ = this.authService.userEmail$.pipe(
    map((userEmail) => this.usersCollection.doc(userEmail))
  );

  readonly currentUser$ = this.currentUserDoc$.pipe(
    switchMap((currentUserDoc) => currentUserDoc.valueChanges())
  );

  readonly boatsCollection =
    this.firestore.collection<any>(BOATS_COLLECTION_ID);

  readonly jobsCollection = this.firestore.collection<Job>(
    JOB_BOARD_COLLECTION_ID
  );

  readonly appDataCollection = this.firestore.collection<AppData>(
    APP_DATA_COLLECTION_ID
  );

  readonly appDataDoc = this.appDataCollection.doc<AppData>(APP_DATA_DOC_ID);

  readonly appData$ = this.appDataDoc.valueChanges();

  readonly jobTypes$ = this.appData$.pipe(map((appData) => appData.types));

  readonly boatNames$ = this.appData$.pipe(
    map((appData) => appData.boats.sort((a, b) => a.name.localeCompare(b.name)))
  );

  readonly selectedBoatDoc$ = this.appService.selectedBoatName$.pipe(
    map((boatName) => this.boatsCollection.doc(boatName))
  );

  readonly selectedBoat$ = this.selectedBoatDoc$.pipe(
    switchMap((doc) => doc.valueChanges())
  );

  readonly jobBoard$ = this.firestore
    .collection<JobBoardJob>(
      JOB_BOARD_COLLECTION_ID,
      (ref) => ref.where('showOnJobBoard', '==', true)
      // .where('submittedBy', '==', null)
    )
    .valueChanges({ idField: 'id' });

  readonly submittedWork$ = this.firestore
    .collection<SignedUpJobBoardJob | UserInitiatedJob>(
      JOB_BOARD_COLLECTION_ID,
      (ref) => ref.where('submittedBy', '!=', null)
    )
    .valueChanges({ idField: 'id' });

  readonly myWork$ = this.authService.userEmail$.pipe(
    switchMap((userEmail) =>
      this.firestore
        .collection<any>(JOB_BOARD_COLLECTION_ID, (ref) =>
          ref.where('volunteerEmail', '==', userEmail)
        )
        .valueChanges()
    )
  );
  // *** Effects ***

  readonly postJob = this.effect<PostedJobDetails>((job$) =>
    job$.pipe(
      tap((postedJobDetails: PostedJobDetails) =>
        this.jobsCollection.add({
          jobDetails: postedJobDetails,
          submittedBy: null,
          showOnJobBoard: true,
        })
      )
    )
  );

  readonly signUpForJob = this.effect<{
    jobId: string;
    volunteer: Volunteer;
    submittedBy: MemberInfo;
  }>((job$) =>
    job$.pipe(
      tap(({ jobId, volunteer, submittedBy }) =>
        this.jobsCollection.doc(jobId).update({
          volunteer,
          submittedBy,
        })
      )
    )
  );

  readonly submitHours = this.effect<any>((formValues$) =>
    formValues$.pipe(
      withLatestFrom(this.authService.userInfo$),

      map(([formValues, userInfo]) => ({
        ...formValues,
        submittedBy: userInfo,
        showOnJobBoard: false,
      })),
      // tap((jobData) => console.log('adding job', jobData)),
      tap((jobData) => this.jobsCollection.add(jobData))
    )
  );

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authService: AuthService,
    private readonly appService: AppService
  ) {
    super();
  }
}
