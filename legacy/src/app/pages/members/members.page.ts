import { Component, ViewChild } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { FirestoreService } from "../../services/firestore.service";
import { IonModal } from "@ionic/angular";

@Component({
	selector: "app-members",
	templateUrl: "./members.page.html",
	styleUrls: ["./members.page.scss"],
})
export class MembersPage extends ComponentStore<never> {
	readonly vm$ = this.select(
		this.firestoreService.membersGrouped$,
		this.firestoreService.membershipsSorted$,
		this.firestoreService.membershipsCSV$,

		(membersGrouped, membershipsSorted, membershipsCSV) => ({
			membersGrouped,
			membershipsSorted,
			membershipsCSV,
		}),
		{ debounce: true }
	);

	@ViewChild(IonModal) modal: IonModal;

	message =
		"This modal example uses triggers to automatically open a modal when the button is clicked.";
	name: string;

	cancel() {
		this.modal.dismiss(null, "cancel");
	}

	constructor(private readonly firestoreService: FirestoreService) {
		super();
		console.log("MembersPage");
		this.vm$.subscribe((vm) => console.log("***", vm));
		this.firestoreService.membersGrouped$.subscribe((vm) =>
			console.log("****", vm)
		);
		this.firestoreService.membershipsSorted$.subscribe((vm) =>
			console.log("!!!!!", vm)
		);
	}
}
