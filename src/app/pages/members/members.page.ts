import { Component } from "@angular/core"
import { ComponentStore } from "@ngrx/component-store"
import { FirestoreService } from "../../services/firestore.service"

@Component({
	selector: "app-members",
	templateUrl: "./members.page.html",
	styleUrls: ["./members.page.scss"],
})
export class MembersPage extends ComponentStore<never> {
	readonly vm$ = this.select(
		this.firestoreService.membersGrouped$,
		this.firestoreService.membershipsSorted$,
		(membersGrouped, membershipsSorted) => ({
			membersGrouped,
			membershipsSorted,
		}),
		{ debounce: true }
	)

	constructor(private readonly firestoreService: FirestoreService) {
		super()
		//console.log("MembersPage")
		//this.vm$.subscribe((vm) => console.log("***", vm))
		// this.firestoreService.membersGrouped$.subscribe((vm) =>
		// 	console.log("****", vm)
		// )
		// this.firestoreService.membershipsSorted$.subscribe((vm) =>
		// 	console.log("*****", vm)
		// )
	}
}
