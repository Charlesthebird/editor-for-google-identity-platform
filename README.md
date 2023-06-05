# Editor for Google Identity Platform

This repo includes an example app where you can edit your Google Identity Platform users and their custom claims. This functionality isn't in the Google Cloud Console UI, but is really useful for adding user attributes to your users (this project isn't affiliated with Google). This also includes some nice React wrapper components for React apps, which can help make implementing authentication and authorization easier.

To get this working, create the file: `/ui/sites/example-app/.env`, and add this information to it:

```shell
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_EDITOR_API_URL="http://localhost:3001"
```

You also need to add a `/server/nodejs/fb-admin-key.json` file, which is your Firebase admin private JSON key file that you can generate in your Google Cloud IAM settings for your Firebase Admin Service Account. This should be treated very securely.

Then run

```shell
make install
```

Then in two different terminals, run:

```shell
make start-example
```

and

```shell
make start-server
```

You should see an interface to edit your Google Identity Platform users and custom claims at http://localhost:3000. This is the example app project at `./ui/sites/example-app`. These custom claims are stored in Google Identity Platform so you don't have to set up any extra storage resources for managing user authorization.
