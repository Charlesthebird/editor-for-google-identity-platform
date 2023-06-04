import { AuthContext } from "editor-for-google-platform-ui";
import { useContext } from "react";

const LoggedOut = () => {
	const { signIn } = useContext(AuthContext);
	return (
		<div>
			<h5>Signed out.</h5>
			<button onClick={signIn}>Sign in!</button>
		</div>
	);
};

export default LoggedOut;
