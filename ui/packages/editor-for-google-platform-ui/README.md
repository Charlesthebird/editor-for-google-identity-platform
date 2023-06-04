# Editor for Google Platform UI

This package helps make implementing authentication and authorization with Firebase and Google Identity Platform easier.

Just add this `AuthContextProvider` to the root of your app, setting the properties appropriately.

```tsx
import { AuthContextProvider } from "editor-for-google-platform-ui";
/* ... */
<AuthContextProvider
  loggedInComponent={<LoggedIn />}
  loggedOutComponent={<LoggedOut />}
  firebaseApiKey={"your-firebase-api-key"}
  firebaseAuthDomain={"your-firebase-auth-domain"}
/>;
```

You can show your logged in view. `signOut()` here will sign out with Firebase, then go to the `<LoggedOut/>` view.

```tsx
import { AuthContext, UserTable } from "editor-for-google-platform-ui";
import { useContext } from "react";

const LoggedIn = () => {
  const { signOut, user } = useContext(AuthContext);
  if (!user) return <>Loading...</>;
  return (
    <div>
      <h5>Signed in as {user?.displayName}</h5>
      <button onClick={signOut}>SIGN OUT</button>
      {/* Your logged-in UI here */}
    </div>
  );
};

export default LoggedIn;
```

Or show a logged out view. `signIn()` here will open a popup to sign in. The user will then go to the `<LoggedIn/>` view.

```tsx
import { AuthContext } from "editor-for-google-platform-ui";
import { useContext } from "react";

const LoggedOut = () => {
  const { signIn } = useContext(AuthContext);
  return (
    <div>
      <h5>Signed out.</h5>
      <button onClick={signIn}>Sign in!</button>
      {/* Your logged-out UI here */}
    </div>
  );
};

export default LoggedOut;
```
