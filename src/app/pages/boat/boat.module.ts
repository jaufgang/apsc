import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { BoatPageRoutingModule } from "./boat-routing.module"
import { BoatPage } from "./boat.page"

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, BoatPageRoutingModule],
	declarations: [BoatPage],
})
export class BoatPageModule {}
