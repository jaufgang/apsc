import { Component } from "@angular/core"
import { ComponentStore } from "@ngrx/component-store"

@Component({
	selector: "app-my-hours",
	templateUrl: "./my-hours.page.html",
	styleUrls: ["./my-hours.page.scss"],
})
export class MyHoursPage extends ComponentStore<any> {
	constructor() {
		super({})
	}
}
