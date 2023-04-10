import { Component } from "@angular/core"
import { postedJobs } from "../../../../import/jobs"
import { FirestoreService } from "../../services/firestore.service"
import { map, switchMap, take, tap, withLatestFrom } from "rxjs/operators"
import {
	JobBoardJob,
	JobCategory,
	MemberWithContactInfo,
	UserInitiatedJob,
} from "../../types/job.types"
import { Observable } from "rxjs"
import { JobType } from "../../types/appData.types"
import { volunteeredJobs } from "../../../../import/hours"
import { currentYear } from "../../util/date-helpers"

@Component({
	selector: "app-import",
	templateUrl: "./import.page.html",
	styleUrls: ["./import.page.scss"],
})
export class ImportPage {
	readonly jobTypes$: Observable<Record<string, JobType>> =
		this.firestoreService.appData$.pipe(
			tap((appData) => console.log(appData)),
			map((appData) =>
				appData.types.reduce(
					(acc, current) => ({
						...acc,
						[current.title]: current,
					}),
					{}
				)
			)
		)

	readonly jobBoard$ = this.firestoreService.jobBoard$

	constructor(private readonly firestoreService: FirestoreService) {
		console.log("??", volunteeredJobs)
	}

	importHours() {
		this.jobBoard$
			.pipe(
				withLatestFrom(this.jobTypes$),
				take(1),
				map(([jobBoard, jobTypes]) =>
					volunteeredJobs.map((volunteeredJob) => {
						const matchingJobType = jobTypes[volunteeredJob.job]
						const matchingJob = jobBoard.find(
							(job) =>
								job.jobDetails.title === volunteeredJob.job &&
								job.jobDetails.date === volunteeredJob.date
						)

						console.log("**********")
						console.log(volunteeredJob)
						console.log(matchingJobType)
						console.log(matchingJob)

						const volunteer: MemberWithContactInfo = {
							contactPhone: "",
							firstName: volunteeredJob.firstName,
							lastName: volunteeredJob.lastName,
							membershipNumber: volunteeredJob.memberId.toString(),
							status: "",
						}

						if (matchingJob) {
							this.firestoreService.signUpForJob({
								jobId: matchingJob.id,
								volunteer,
								submittedBy: {
									name: "import",
									email: "",
									emailVerified: false,
								},
							})
						} else {
							const userInitiatedJob: UserInitiatedJob = {
								seasonYear: currentYear,
								jobDetails: {
									hours: volunteeredJob.hours,
									category: volunteeredJob.job as JobCategory,
									description: volunteeredJob.job,
									date: volunteeredJob.date,
								},
								showOnJobBoard: false,
								submittedBy: null,
								volunteer,
							}
							this.firestoreService.submitHours(userInitiatedJob)
						}
					})
				)
				//  tap((results) => results.forEach((result) => console.log(result)))
			)
			.subscribe()
	}

	importJobs() {
		this.jobTypes$
			.pipe(
				map((jobTypes) =>
					postedJobs.map((postedJob): JobBoardJob => {
						console.log(postedJob)
						return {
							seasonYear: currentYear,
							jobDetails: {
								title: postedJob.jobTitle,
								category: jobTypes[postedJob.jobTitle].category,
								description: jobTypes[postedJob.jobTitle].description,
								date: postedJob.date,
								hours: postedJob.hours,
							},
							showOnJobBoard: true,
							submittedBy: null,
						}
					})
				),
				switchMap((jobs) =>
					Promise.all(
						jobs.map(async (job) => {
							console.log(job)
							const x = await this.firestoreService.jobsCollection.add(job)
							console.log(x)
						})
					)
				),
				tap(() => console.log("done"))
			)
			.subscribe()
	}
}
