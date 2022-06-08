import { Component } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-boats',
  templateUrl: './boats.page.html',
  styleUrls: ['./boats.page.scss'],
})
export class BoatsPage {
  readonly boats$ = this.firestoreService.boatNames$;

  readonly vm$ = this.boats$.pipe(
    map((boats) => ({
      boats,
    }))
  );

  constructor(private readonly firestoreService: FirestoreService) {}
}
