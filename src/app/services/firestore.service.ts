import { Injectable } from "@angular/core"
import { ComponentStore } from "@ngrx/component-store"
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from "@angular/fire/compat/firestore"
import {
	map,
	shareReplay,
	startWith,
	switchMap,
	tap,
	withLatestFrom,
} from "rxjs/operators"
import { AuthService } from "./auth.service"
import { AppData, Member } from "../types/appData.types"
import {
	Job,
	JobBoardJob,
	jobCategoryEmail,
	PostedJobDetails,
	SignedUpJob,
	SignedUpJobBoardJob,
	UserInitiatedJob,
} from "../types/job.types"
import { AppService } from "./app.service"
import { addDays } from "date-fns"
import { currentYear } from "../util/date-helpers"

const USERS_COLLECTION_ID = "Users"
const BOATS_COLLECTION_ID = "Boats"
const JOB_BOARD_COLLECTION_ID = "Jobs"
const APP_DATA_COLLECTION_ID = "AppData"
const APP_DATA_DOC_ID = "Jobs"
export interface User {
	isAdmin?: boolean
	member?: Member
}

@Injectable({
	providedIn: "root",
})
export class FirestoreService extends ComponentStore<never> {
	// *** Selectors ***

	readonly usersCollection =
		this.firestore.collection<User>(USERS_COLLECTION_ID)

	readonly currentUserDoc$ = this.authService.userEmail$.pipe(
		map((userEmail) => this.usersCollection.doc(userEmail))
	)

	readonly currentUser$ = this.currentUserDoc$.pipe(
		switchMap((currentUserDoc) => currentUserDoc.valueChanges()),
		shareReplay(1)
	)

	readonly boatsCollection = this.firestore.collection<any>(BOATS_COLLECTION_ID)

	readonly jobsCollection = this.firestore.collection<Job>(
		JOB_BOARD_COLLECTION_ID
	)

	readonly appDataCollection = this.firestore.collection<AppData>(
		APP_DATA_COLLECTION_ID
	)

	readonly appDataDoc = this.appDataCollection.doc<AppData>(APP_DATA_DOC_ID)

	readonly appData$ = this.appDataDoc.valueChanges().pipe(shareReplay(1))

	readonly jobTypes$ = this.appData$.pipe(map((appData) => appData.types))

	readonly members$ = this.appData$.pipe(
		map((appData) =>
			appData.members.sort((a, b) =>
				a.lastName !== b.lastName
					? a.lastName.localeCompare(b.lastName)
					: a.firstName.localeCompare(b.firstName)
			)
		)
	)

	readonly membersGrouped$ = this.members$.pipe(
		map((members) =>
			members.reduce(
				(acc, { membershipNumber, ...member }) => ({
					...acc,
					...{
						[membershipNumber]: [...(acc[membershipNumber] ?? []), member].sort(
							(a, b) => a.status.localeCompare(b.status)
						),
					},
				}),
				{}
			)
		)
	)

	readonly boatNames$ = this.appData$.pipe(
		map((appData) => appData.boats.sort((a, b) => a.name.localeCompare(b.name)))
	)

	readonly selectedBoatDoc$ = this.appService.selectedBoatName$.pipe(
		map((boatName) => this.boatsCollection.doc(boatName))
	)

	readonly selectedBoat$ = this.selectedBoatDoc$.pipe(
		switchMap((doc) => doc.valueChanges()),
		shareReplay(1)
	)

	readonly jobBoard$ = this.firestore
		.collection<JobBoardJob>(JOB_BOARD_COLLECTION_ID, (ref) =>
			ref
				.where("showOnJobBoard", "==", true)
				.where("jobDetails.date", ">=", addDays(new Date(), -1).toISOString())
		)
		.valueChanges({ idField: "id" })
		.pipe(shareReplay(1))

	readonly submittedWork$ = this.firestore
		.collection<SignedUpJobBoardJob | UserInitiatedJob>(
			JOB_BOARD_COLLECTION_ID,
			(ref) =>
				ref
					.where("seasonYear", "==", currentYear)
					.where("submittedBy", "!=", null)
		)
		.valueChanges({ idField: "id" })
		.pipe(
			map((work) =>
				work.sort((a, b) => b.jobDetails.date.localeCompare(a.jobDetails.date))
			),
			shareReplay(1)
		)

	readonly submittedByMembershipNumber$ = this.submittedWork$.pipe(
		// map((submittedWork) =>
		//   submittedWork.filter(
		//     (workItem) => workItem.volunteer.membershipNumber === membershipNumber
		//   )
		// ),
		startWith([]),
		map((submittedWork) =>
			submittedWork.reduce(
				(acc, job): any => ({
					...acc,
					[job.volunteer.membershipNumber]: {
						totalHours:
							(acc[job.volunteer.membershipNumber]?.totalHours ?? 0) +
							job.jobDetails.hours,
						jobs: [
							...(acc[job.volunteer.membershipNumber]?.jobs ?? []),
							{ ...job },
						],
					},
				}),
				{} as any
			)
		)
	)

	readonly membershipsSorted$ = this.membersGrouped$.pipe(
		withLatestFrom(this.submittedByMembershipNumber$),
		map(([memberships, submittedByMembershipNumber]) =>
			Object.entries(memberships)
				.map(([membershipNumber, members]) => ({
					membershipNumber,
					members,
					submittedWork: submittedByMembershipNumber[membershipNumber],
				}))
				.sort((a, b) =>
					a.members[0].lastName.localeCompare(b.members[0].lastName)
				)
		)
	)

	readonly myWork$ = this.authService.userEmail$.pipe(
		switchMap((userEmail) =>
			this.firestore
				.collection<any>(JOB_BOARD_COLLECTION_ID, (ref) =>
					ref
						.where("seasonYear", "==", currentYear)
						.where("volunteerEmail", "==", userEmail)
				)
				.valueChanges()
		),
		shareReplay(1)
	)
	// *** Effects ***

	readonly postJob = this.effect<PostedJobDetails>((job$) =>
		job$.pipe(
			tap((postedJobDetails: PostedJobDetails) =>
				this.jobsCollection.add({
					seasonYear: currentYear,
					jobDetails: postedJobDetails,
					submittedBy: null,
					showOnJobBoard: true,
				})
			)
		)
	)

	readonly signUpForJob = this.effect<SignedUpJob>((job$) =>
		job$.pipe(
			tap(({ job, volunteer, submittedBy }) => {
				this.jobsCollection.doc(job.id).update({
					volunteer,
					submittedBy,
				})
			}),
			tap((job: SignedUpJob) => this.sendSignedUpJobAlert(job))
		)
	)

	readonly cancelSignUp = this.effect<SignedUpJobBoardJob & { id: string }>(
		(job$) =>
			job$.pipe(
				tap((job: SignedUpJobBoardJob & { id: string }) =>
					this.jobsCollection.doc(job.id).update({
						volunteer: null,
						submittedBy: null,
					})
				),
				tap((job: SignedUpJobBoardJob & { id: string }) =>
					this.sendCancellationAlert(job)
				)
			)
	)

	readonly submitHours = this.effect<any>((formValues$) =>
		formValues$.pipe(
			withLatestFrom(this.authService.userInfo$),

			map(([formValues, userInfo]) => ({
				...formValues,
				seasonYear: currentYear,
				submittedBy: { name: userInfo.name, email: userInfo.email },
				showOnJobBoard: false,
			})),
			tap((jobData) => this.jobsCollection.add(jobData)),
			tap((jobData) => this.sendHoursLoggedAlert(jobData))
		)
	)

	readonly setCurrentUserMember = this.effect<Member>((member$) =>
		member$.pipe(
			withLatestFrom(this.currentUserDoc$),
			tap(
				([member, currentUserDoc]: [
					Member,
					AngularFirestoreDocument<User>
				]) => {
					currentUserDoc.set({ member }, { merge: true })
				}
			)
		)
	)

	readonly sendSignedUpJobAlert = this.effect<SignedUpJob>((alert$) =>
		alert$.pipe(
			tap((signedUpJob: SignedUpJob) =>
				this.sendEmail({
					to: jobCategoryEmail[signedUpJob.job.jobDetails.category],
					message: {
						subject: "Job Board signup",
						text: `A member has signed up for a job from the job board.

Job: ${signedUpJob.job.jobDetails.title}
Date: ${signedUpJob.job.jobDetails.date}
Volunteer: ${signedUpJob.volunteer.firstName} ${signedUpJob.volunteer.lastName}
Phone Number: ${signedUpJob.volunteer.contactPhone}
Signed Up By: ${signedUpJob.submittedBy.name}
						`,
					},
				})
			)
		)
	)

	readonly sendCancellationAlert = this.effect<
		SignedUpJobBoardJob & { id: string }
	>((alert$) =>
		alert$.pipe(
			withLatestFrom(this.currentUser$),
			tap(([job, user]: [SignedUpJobBoardJob & { id: string }, User]) =>
				this.sendEmail({
					to: jobCategoryEmail[job.jobDetails.category],
					message: {
						subject: "Job Board Cancellation",
						text: `A member has cancelled their sign-up for a job from the job board.

Job: ${job.jobDetails.title}
Date: ${job.jobDetails.date}
Volunteer: ${job.volunteer.firstName} ${job.volunteer.lastName}
Phone Number: ${job.volunteer.contactPhone}
Cancelled By: ${user.member.firstName} ${user.member.lastName}
`,
					},
				})
			)
		)
	)

	readonly sendHoursLoggedAlert = this.effect<any>((alert$) =>
		alert$.pipe(
			tap((alert) =>
				this.sendEmail({
					to: jobCategoryEmail[alert.jobDetails.category],
					message: {
						subject: "Volunteer Work Hours Logged",
						text: `A member has logged work hours.

Job: ${alert.jobDetails.description}
Hours: ${alert.jobDetails.hours}
Date: ${alert.jobDetails.date}
Volunteer: ${alert.volunteer.firstName} ${alert.volunteer.lastName}
Submitted By: ${alert.submittedBy.name}
`,
					},
				})
			)
		)
	)

	readonly sendEmail = this.effect<{
		to: string
		message: { subject: string; html?: string; text?: string }
	}>((email$) =>
		email$.pipe(tap((email) => this.firestore.collection("mail").add(email)))
	)

	constructor(
		private readonly firestore: AngularFirestore,
		private readonly authService: AuthService,
		private readonly appService: AppService
	) {
		super()
		// const members = memberList
		// console.log(members.length)
		// this.members$.subscribe((m) => console.log(m.length))
		// this.appDataDoc.update({ members })

		// this.jobsCollection.ref.get().then(function (querySnapshot) {
		// 	querySnapshot.forEach(function (doc) {
		// 		doc.ref.update({
		// 			seasonYear: 2022,
		// 		})
		// 	})
		// })

		//    this.members$.subscribe((members) => console.log(members));
	}
}
