import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { JobDataPageRoutingModule } from "./job-data-routing.module"

import { JobDataPage } from "./job-data.page"

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		JobDataPageRoutingModule,
	],
	declarations: [JobDataPage],
})
export class JobDataPageModule {}
