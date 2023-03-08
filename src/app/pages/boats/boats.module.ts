import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

import { IonicModule } from "@ionic/angular"

import { BoatsPageRoutingModule } from "./boats-routing.module"

import { BoatsPage } from "./boats.page"

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, BoatsPageRoutingModule],
	declarations: [BoatsPage],
})
export class BoatsPageModule {}
