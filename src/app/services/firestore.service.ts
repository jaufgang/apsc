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
  Volunteer,
} from '../types/job.types';

const USERS_COLLECTION_ID = 'Users';
const JOB_BOARD_COLLECTION_ID = 'JobBoard';
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

  readonly jobsCollection = this.firestore.collection<Job>(
    JOB_BOARD_COLLECTION_ID
  );

  readonly appDataCollection = this.firestore.collection<AppData>(
    APP_DATA_COLLECTION_ID
  );

  readonly appDataDoc = this.appDataCollection.doc<AppData>(APP_DATA_DOC_ID);

  readonly appData$ = this.appDataDoc.valueChanges();

  readonly jobTypes$ = this.appData$.pipe(map((appData) => appData.types));

  readonly boats$ = this.appData$.pipe(
    map((appData) => appData.boats.sort((a, b) => a.name.localeCompare(b.name)))
  );

  readonly jobBoard$ = this.firestore
    .collection<JobBoardJob>(JOB_BOARD_COLLECTION_ID, (ref) =>
      ref.where('showOnJobBoard', '==', true).where('submittedBy', '==', null)
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
      withLatestFrom(this.authService.userEmail$),
      tap(([formValues, memberEmail]) =>
        this.jobsCollection.add({
          ...formValues,
          memberEmail,
          showOnJobBoard: false,
        })
      )
    )
  );

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authService: AuthService
  ) {
    super();
  }
}
