import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { WorkLogPageRoutingModule } from "./work-log-routing.module"

import { WorkLogPage } from "./work-log.page"

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
		WorkLogPageRoutingModule,
	],
	declarations: [WorkLogPage],
})
export class WorkLogPageModule {}
