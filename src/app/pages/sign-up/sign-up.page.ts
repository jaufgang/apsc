import { Component } from "@angular/core"
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs/operators"
import { ActivatedRoute } from "@angular/router"
import { FirestoreService } from "../../services/firestore.service"
import { ComponentStore } from "@ngrx/component-store"
import { FormBuilder, Validators } from "@angular/forms"
import { AuthService } from "../../services/auth.service"
import { PHONE_NUMBER_REGEX } from "../../util/regex"
import { Member } from "../../types/appData.types"
import { Observable } from "rxjs"
import { AlertController } from "@ionic/angular"
import { Job, SignedUpJobBoardJob } from "../../types/job.types"

@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.page.html",
	styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage extends ComponentStore<{ submitted?: boolean }> {
	readonly members$ = this.firestoreService.members$

	readonly jobId$ = this.route.paramMap.pipe(
		map((paramMap) => paramMap.get("jobId"))
	)

	readonly job$ = this.jobId$.pipe(
		switchMap((jobId) =>
			this.firestoreService.jobBoard$.pipe(
				map((jobs) => jobs.find((job) => job.id === jobId))
			)
		)
	)

	readonly submitted$ = this.job$.pipe(map((job) => !!job.submittedBy))

	readonly form = this.fb.group({
		member: ["", [Validators.required]],
		phone: ["", [Validators.required, Validators.pattern(PHONE_NUMBER_REGEX)]],
	})

	readonly formValues$ = this.form.valueChanges as Observable<{
		member: Member
		phone: string
	}>

	readonly vm$ = this.select(
		this.authService.userInfo$,
		this.jobId$,
		this.job$,
		this.members$,
		this.formValues$,
		this.submitted$,
		(userInfo, jobId, job, members, formValues, submitted) => ({
			userInfo,
			jobId,
			job,
			members,
			formValues,
			submitted,
		}),
		{ debounce: true }
	)

	// *** Effects ***

	readonly submit = this.effect(($) =>
		$.pipe(
			withLatestFrom(this.job$, this.formValues$, this.authService.userInfo$),
			map(([, job, formValues, userInfo]) => ({
				job,
				volunteer: { ...formValues.member, contactPhone: formValues.phone },
				submittedBy: userInfo,
			})),
			tap((signUpData) => {
				this.firestoreService.signUpForJob(signUpData)
				// return console.log(signUpData);
			}),
			tap(() => this.patchState({ submitted: true })),
			tap(() => this.form.disable())
		)
	)

	readonly cancelSignUp = this.effect<SignedUpJobBoardJob & { id: string }>(
		(job$) =>
			job$.pipe(
				tap((job) => this.firestoreService.cancelSignUp(job)),
				tap(() => this.form.reset()),
				tap(() => this.form.enable())
			)
	)

	readonly initializeFormIfVolunteerHasSignedUp = this.effect<Job>((job$) =>
		job$.pipe(
			filter((job) => !!(job as SignedUpJobBoardJob).volunteer),
			withLatestFrom(this.members$),
			tap(([{ volunteer }, members]: [SignedUpJobBoardJob, Member[]]) =>
				this.form.patchValue({
					member: members.find(
						(member) =>
							member.membershipNumber === volunteer.membershipNumber &&
							member.lastName === volunteer.lastName &&
							member.firstName === volunteer.firstName
					),
					phone: volunteer.contactPhone,
				})
			)
		)
	)

	constructor(
		private readonly route: ActivatedRoute,
		private readonly firestoreService: FirestoreService,
		private readonly fb: FormBuilder,
		private readonly authService: AuthService,
		private readonly alertController: AlertController
	) {
		super({})
		this.vm$.subscribe((vm) => console.log("[SignUpPage] vm", vm))

		this.initializeFormIfVolunteerHasSignedUp(this.job$)

		this.firestoreService.currentUser$.subscribe((user) => {
			this.form.patchValue({
				member: user.member,
			})
		})
	}

	compareWith(a: Member, b: Member) {
		return a.membershipNumber === b.membershipNumber && a.status === b.status
	}

	async confirmCancelSignUp(job) {
		const alert = await this.alertController.create({
			header: "Confirm Cancel Sign Up",
			message: "Are you sure you want to cancel this job sign-up?",
			buttons: [
				{
					text: `No, don't cancel`,
					role: "cancel",
					cssClass: "secondary",
					id: "cancel-button",
					handler: () => {
						console.log("Confirm Cancel")
					},
				},
				{
					text: "Yes, cancel this sign-up",
					id: "confirm-button",
					handler: () => {
						this.cancelSignUp(job)
					},
				},
			],
		})

		await alert.present()
	}
}
