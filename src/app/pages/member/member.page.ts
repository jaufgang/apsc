import { Component } from "@angular/core"
import { FirestoreService } from "../../services/firestore.service"
import { ActivatedRoute } from "@angular/router"
import { ComponentStore } from "@ngrx/component-store"
import { map } from "rxjs/operators"
import { combineLatest } from "rxjs"

@Component({
	selector: "app-member",
	templateUrl: "./member.page.html",
	styleUrls: ["./member.page.scss"],
})
export class MemberPage extends ComponentStore<never> {
	readonly submittedWork$ = this.firestoreService.submittedWork$

	readonly membershipNumber$ = combineLatest([
		this.route.paramMap,
		this.firestoreService.currentUser$,
	]).pipe(
		map(([params, currentUser]) => {
			console.log(params)
			return params.has("membershipNumber")
				? params.get("membershipNumber")
				: currentUser.member.membershipNumber
		})
	)

	readonly member$ = this.select(
		this.membershipNumber$,
		this.firestoreService.membersGrouped$,
		(membershipNumber, membersGrouped) => membersGrouped[membershipNumber]
	)

	readonly submittedByMembershipNumber$ = combineLatest([
		this.submittedWork$,
		this.membershipNumber$,
	]).pipe(
		map(([submittedWork, membershipNumber]) =>
			submittedWork.filter(
				(workItem) => workItem.volunteer.membershipNumber === membershipNumber
			)
		),
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
	)

	readonly vm$ = this.select(
		this.membershipNumber$,
		this.member$,
		this.submittedByMembershipNumber$,
		(membershipNumber, member, submittedByMembershipNumber) => ({
			membershipNumber,
			member,
			submittedByMembershipNumber,
		})
	)

	constructor(
		private readonly firestoreService: FirestoreService,
		private readonly route: ActivatedRoute
	) {
		super()
		this.vm$.subscribe(console.log)
	}
}
