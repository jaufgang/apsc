import { Component } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FirestoreService } from '../../services/firestore.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage extends ComponentStore<never> {
  readonly membershipsSorted$ = this.firestoreService.membersGrouped$.pipe(
    map((memberships) =>
      Object.entries(memberships)
        .map(([membershipNumber, members]) => ({
          membershipNumber,
          members,
        }))
        .sort((a, b) =>
          a.members[0].lastName.localeCompare(b.members[0].lastName)
        )
    )
  );

  readonly vm$ = this.select(
    this.firestoreService.membersGrouped$,
    this.membershipsSorted$,
    (membersGrouped, membershipsSorted) => ({
      membersGrouped,
      membershipsSorted,
    })
  );

  constructor(private readonly firestoreService: FirestoreService) {
    super();
    this.vm$.subscribe(console.log);
  }
}
