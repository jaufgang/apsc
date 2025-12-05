import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { JobBoardPageRoutingModule } from "./job-board-routing.module"
import { JobBoardPage } from "./job-board.page"

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, JobBoardPageRoutingModule],
	declarations: [JobBoardPage],
})
export class JobBoardPageModule {}
