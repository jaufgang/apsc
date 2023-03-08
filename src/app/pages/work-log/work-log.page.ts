import { Component } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { jobCategoryOptions } from "../../types/job.types"
import { ComponentStore } from "@ngrx/component-store"
import { map, startWith, takeUntil, tap, withLatestFrom } from "rxjs/operators"
import { FirestoreService } from "../../services/firestore.service"
import { AuthService } from "../../services/auth.service"
import { datePart } from "../../util/date-helpers"
import { Member } from "../../types/appData.types"

@Component({
	selector: "app-work-log",
	templateUrl: "./work-log.page.html",
	styleUrls: ["./work-log.page.scss"],
})
export class WorkLogPage extends ComponentStore<{ submitted?: boolean }> {
	readonly form = this.fb.group({
		member: ["", [Validators.required]],
		jobCategory: ["", [Validators.required]],
		description: ["", [Validators.required, Validators.minLength(5)]],
		date: ["", [Validators.required]],
		hours: ["", [Validators.required, Validators.min(1)]],
	})

	readonly jobCategoryOptions = jobCategoryOptions

	// *** Selectors ***
	readonly submitted$ = this.select((state) => state.submitted)

	readonly formValues$ = this.form.valueChanges.pipe(
		map((formValues) => ({ ...formValues, date: datePart(formValues.date) })),
		startWith(undefined)
	)

	readonly vm$ = this.select(
		this.formValues$,
		this.firestoreService.currentUser$,
		this.firestoreService.members$,
		this.submitted$,
		(formValues, currentUser, members, submitted) => ({
			formValues,
			currentUser,
			members,
			submitted,
		})
	)

	// *** Effects ***

	readonly submitHours = this.effect(($) =>
		$.pipe(
			withLatestFrom(this.formValues$),
			map(([, formValues]) => formValues),
			tap(() => this.patchState({ submitted: true })),
			tap(() => this.form.disable()),
			map((formValues) => {
				const { status, ...volunteer } = formValues.member
				return {
					showOnJobBoard: false,
					jobDetails: {
						category: formValues.jobCategory,
						description: formValues.description,
						date: formValues.date,
						hours: formValues.hours,
					},
					volunteer,
				}
			}),
			tap((formValues) => this.firestoreService.submitHours(formValues))
		)
	)

	readonly resetForm = this.effect(($) =>
		$.pipe(
			tap(() => this.form.reset()),
			tap(() => this.form.enable()),
			tap(() => this.patchState({ submitted: false }))
		)
	)

	constructor(
		private readonly fb: FormBuilder,
		private readonly firestoreService: FirestoreService,
		private readonly authService: AuthService
	) {
		super({})

		this.firestoreService.currentUser$
			.pipe(takeUntil(this.destroy$))
			.subscribe((user) => {
				this.form.patchValue({
					member: user.member,
				})
			})
	}

	readonly isDateEnabled = (dateIsoString: string) => {
		const date = new Date(dateIsoString)
		return date.getDate() !== 17
	}

	setDate(value: string) {
		this.form.patchValue({ date: value })
	}

	compareWith(a: Member, b: Member) {
		return a.membershipNumber === b.membershipNumber && a.status === b.status
	}
}
