import { Injectable } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/compat/auth"
import { ComponentStore } from "@ngrx/component-store"
import { map, switchMap, tap } from "rxjs/operators"
import firebase from "firebase/compat/app"
import { EmptyObject } from "../types/util.types"
import { Router } from "@angular/router"
import * as firebaseui from "firebaseui"

export interface UserInfo {
	name: string
	email: string
	emailVerified: boolean
}

@Injectable({
	providedIn: "root",
})
export class AuthService extends ComponentStore<EmptyObject> {
	// *** Selectors

	readonly user$ = this.auth.authState

	readonly isSignedInAndVerified$ = this.user$.pipe(
		// tap((user) => console.log('ccc', user)),
		map((user) => !!user?.emailVerified)
	)

	readonly userInfo$ = this.user$.pipe(
		map((user) => ({
			name: user?.displayName,
			email: user?.email,
			emailVerified: !!user?.emailVerified,
		}))
	)

	readonly userEmail$ = this.userInfo$.pipe(map(({ email }) => email))

	readonly userName$ = this.userInfo$.pipe(map(({ name }) => name))

	//  *** Effects ***

	readonly signOut = this.effect(($) =>
		$.pipe(
			switchMap(() => this.auth.signOut()),
			tap(() => {
				this.router.navigate(["login"])
			})
		)
	)

	// readonly tryAgain$ = this.effect(($) =>
	//   $.pipe(
	//     switchMap(() => this.auth.()),
	//     tap(() => {
	//       this.router.navigate(['login']);
	//     })
	//   )
	// );

	constructor(
		private readonly auth: AngularFireAuth,
		private readonly router: Router
	) {
		super({})

		// this.auth.authState.subscribe((authState) =>
		//   console.log('[AuthService] authState', authState)
		// );
		//
		// this.state$.subscribe((state) =>
		//   console.log('[AuthService], state', state)
		// );
	}

	fbui(authContainerId: string) {
		const ui = new firebaseui.auth.AuthUI(firebase.auth())
		ui.start(authContainerId, {
			callbacks: {
				signInSuccessWithAuthResult: (authResult, redirectUrl) => {
					if (
						authResult.additionalUserInfo.providerId === "password" &&
						!authResult.user?.emailVerified
					) {
						if (authResult.additionalUserInfo.isNewUser) {
							authResult.user.sendEmailVerification()
						} else {
							//prompt to re-send verification email;
						}
					}

					// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
					// console.log(authResult);
					return true
				},
			},
			// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
			signInFlow: "popup",
			signInSuccessUrl: "/",

			signInOptions: [
				firebase.auth.EmailAuthProvider.PROVIDER_ID,
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				// firebase.auth.FacebookAuthProvider.PROVIDER_ID,
				// firebase.auth.TwitterAuthProvider.PROVIDER_ID,
			],
			// Other config options...
		})
	}
}
