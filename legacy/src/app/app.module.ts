import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { RouteReuseStrategy } from "@angular/router"
import { IonicModule, IonicRouteStrategy } from "@ionic/angular"
import { AppComponent } from "./app.component"
import { AppRoutingModule } from "./app-routing.module"
import { initializeApp, provideFirebaseApp } from "@angular/fire/app"
import { environment } from "../environments/environment"
import { getAuth, provideAuth } from "@angular/fire/auth"
import { getFirestore, provideFirestore } from "@angular/fire/firestore"
import { AngularFireModule } from "@angular/fire/compat"
import { AsyncPipe, CommonModule, DatePipe, JsonPipe } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store"
import { StoreModule } from "@ngrx/store"

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		StoreModule.forRoot({
			router: routerReducer,
		}),
		StoreRouterConnectingModule.forRoot(),
	],
	providers: [
		DatePipe,
		AsyncPipe,
		JsonPipe,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
