import { getApps, initializeApp } from "firebase/app";
import {
	Auth,
	GoogleAuthProvider,
	User,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

//
// Types
//
interface AuthProviderProps {
	loggedInComponent: React.ReactNode;
	loggedOutComponent: React.ReactNode;
	/**
	 *  Unlike how API keys are typically used,
	 * API keys for Firebase services are not
	 * used to control access to backend resources
	 * and can be put in the UI source.
	 */
	firebaseApiKey: string;
	firebaseAuthDomain: string;
	editorForGooglePlatformApiUrl?: string;
	children?: React.ReactNode;
}
interface IAuthContext {
	signIn: () => Promise<void>;
	signOut: () => void;
	user: User | null;
	authError: string;
	latestIdToken: string | undefined;
	editorForGooglePlatformApiUrl: string;
	children?: React.ReactNode;
}

//
// Context
//
export const AuthContext = createContext({} as IAuthContext);

//
// Provider
//
export const AuthContextProvider = (props: AuthProviderProps) => {
	const { editorForGooglePlatformApiUrl } = props;
	const [auth, setAuth] = useState<Auth>();
	useEffect(() => {
		//
		// AUTH INIT
		//
		const firebaseConfig = {
			//
			//
			apiKey: props.firebaseApiKey,
			authDomain: props.firebaseAuthDomain,
		};
		let app: any;
		const apps = getApps();
		if (!apps.length) app = initializeApp(firebaseConfig);
		else app = apps[0];
		setAuth(getAuth(app));
	}, [setAuth]);

	const [latestIdToken, setLatestIdToken] = useState<string>();
	useEffect(() => {
		if (!auth) return;
		auth.onIdTokenChanged(async (user) => {
			if (user) {
				const newToken = await user.getIdToken();
				setLatestIdToken(newToken);
			} else {
				setLatestIdToken(undefined);
			}
		});
	}, [auth]);

	const [user, setUser] = useState<User | null>();
	useEffect(() => {
		if (!auth) return;
		onAuthStateChanged(auth, setUser);
	}, [setUser, auth]);

	const [authError, setAuthError] = useState("");
	async function signIn() {
		if (!auth) return;
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			// window.location.href = "/game";
		} catch (e) {
			setAuthError("Invalid user.");
			console.error(e);
		}
	}

	// Wait while the auth loads.
	if (user === undefined || auth === undefined) {
		return null;
	}
	return (
		<AuthContext.Provider
			value={{
				signIn,
				signOut: () => signOut(auth),
				user,
				latestIdToken,
				authError,
				editorForGooglePlatformApiUrl: editorForGooglePlatformApiUrl ?? "",
			}}
		>
			<>
				{props.children}
				{!latestIdToken ? props.loggedOutComponent : props.loggedInComponent}
			</>
		</AuthContext.Provider>
	);
};
