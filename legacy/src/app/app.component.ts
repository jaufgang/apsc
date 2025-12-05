import { Component } from "@angular/core"
import { AuthService } from "./services/auth.service"
import { ComponentStore } from "@ngrx/component-store"
import { FirestoreService } from "./services/firestore.service"
import { ModalController } from "@ionic/angular"
import { Member } from "./types/appData.types"

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent extends ComponentStore<any> {
	public readonly appPages = [
		{
			title: "Members",
			pages: [
				{ title: "Job Board", url: "/job-board", icon: "calendar" },
				{
					title: "Log My Hours",
					url: "/work-log",
					icon: "create",
				},
				{
					title: "My Hours",
					url: "/my-hours",
					icon: "list-circle",
				},
			],
		},
		{
			title: "Admin",
			pages: [
				{ title: "Job Descriptions", url: "/job-data", icon: "construct" },

				{ title: "Post A Job", url: "/post-job", icon: "add-circle" },
				{ title: "Members", url: "/members", icon: "people" },
			],
		},
	]

	readonly selectedMember$ = this.select((state) => state.selectedMember)

	readonly vm$ = this.select(
		this.authService.isSignedInAndVerified$,
		this.authService.userInfo$,
		this.firestoreService.currentUser$,
		this.firestoreService.members$,
		this.selectedMember$,
		(isSignedIn, userInfo, currentUser, members, selectedMember) => ({
			isSignedIn,
			userInfo,
			currentUser,
			members,
			selectedMember,
		})
	)

	constructor(
		private readonly authService: AuthService,
		private readonly firestoreService: FirestoreService,
		private readonly modalController: ModalController
	) {
		super({})
		//this.ensureUserHasMembership(firestoreService.currentUser$);

		this.state$.subscribe((state) => console.log("[AppComponent] state", state))
		this.vm$.subscribe((vm) => console.log("[AppComponent] vm", vm))
	}

	logout() {
		this.authService.signOut()
	}

	selectMember(selectedMember: Member) {
		this.patchState({ selectedMember })
	}

	setMember(member: Member) {
		this.firestoreService.setCurrentUserMember(member)
	}
}
