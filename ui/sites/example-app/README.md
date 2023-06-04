This is an example app where you can edit your google identity platform users and their claims.

To get this working, create the file: `/ui/sites/example-app/.env`, and add this information to it:

```shell
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_EDITOR_API_URL="http://localhost:3001"
```

Then run `yarn install` and `yarn start` (the API will need to be running in one of the `/server` subfolders) and it should all work.
