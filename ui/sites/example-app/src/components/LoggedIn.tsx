import { AuthContext, UserTable } from "editor-for-google-platform-ui";
import { useContext } from "react";

const LoggedIn = () => {
	const { signOut, user } = useContext(AuthContext);
	if (!user) return <>Loading...</>;
	return (
		<div>
			<h5>Signed in as {user?.displayName}</h5>
			<button onClick={signOut}>SIGN OUT</button>
			<br />
			<UserTable />
		</div>
	);
};

export default LoggedIn;
