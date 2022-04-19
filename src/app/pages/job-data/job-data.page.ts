import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { ComponentStore } from '@ngrx/component-store';
import { AppData } from '../../types/appData.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-data',
  templateUrl: './job-data.page.html',
  styleUrls: ['./job-data.page.scss'],
})
export class JobDataPage extends ComponentStore<never> {
  readonly jobTypes$ = this.firestoreService.jobTypes$;

  readonly vm$ = this.select(this.jobTypes$, (jobTypes) => ({
    jobTypes,
  }));

  constructor(private readonly firestoreService: FirestoreService) {
    super();
  }
}
