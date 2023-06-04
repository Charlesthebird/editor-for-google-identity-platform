import { AuthContextProvider } from "editor-for-google-platform-ui";
import LoggedIn from "./components/LoggedIn";
import LoggedOut from "./components/LoggedOut";

function App() {
	return (
		<AuthContextProvider
			loggedInComponent={<LoggedIn />}
			loggedOutComponent={<LoggedOut />}
			firebaseApiKey={import.meta.env.VITE_FIREBASE_API_KEY as string}
			firebaseAuthDomain={import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string}
			editorForGooglePlatformApiUrl={import.meta.env.VITE_EDITOR_API_URL as string}
		/>
	);
}

export default App;
