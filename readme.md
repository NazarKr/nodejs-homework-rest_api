**Routes<br>**

**Authenticate:<br>**

**POST /register:** Creates a new user account. Accepts a JSON payload containing the user's email and password. Performs validation of the request body against the registerSchema defined in the users model. Calls the register controller function to handle the registration process.

**GET /verify/:verificationToken:** Verifies the user's email address using the provided verification token. Calls the verify controller function to handle the verification process.

**POST /resend-verify-email:**** Resends the verification email to the user's email address. Accepts a JSON payload containing the user's email. Performs validation of the request body against the emailSchema defined in the users model. Calls the resendVerifyEmail controller function to handle the email resend process.

**POST /login:** Authenticates the user and generates a JWT token for authorization. Accepts a JSON payload containing the user's email and password. Performs validation of the request body against the loginSchema defined in the users model. Calls the login controller function to handle the login process.

**GET /users/current:** Retrieves the currently authenticated user's information. Requires authentication using a JWT token. Calls the getCurrent controller function to retrieve the user's information.

**POST /logout:** Logs out the currently authenticated user by invalidating their JWT token. Requires authentication using a JWT token. Calls the logout controller function to handle the logout process.

**PATCH /users:** Updates the subscription status of the currently authenticated user. Requires authentication using a JWT token. Accepts a JSON payload containing the new subscription status. Performs validation of the request body against the updateSubscriptionSchema defined in the users model. Calls the updateSubscription controller function to handle the update process.

**PATCH /avatars:** Updates the user's avatar image. Requires authentication using a JWT token. Accepts a file upload with the avatar field. Calls the updateAvatar controller function to handle the avatar update process.

**Contacts:<br>**

**GET /:** Retrieves all contacts. Requires authentication using a JWT token. Calls the getAllContacts controller function to fetch all contacts.

**GET /:contactId:** Retrieves a specific contact by its ID. Requires authentication using a JWT token. Calls the getById controller function to fetch the contact by ID.

**POST /:** Creates a new contact. Requires authentication using a JWT token. Accepts a JSON payload containing the contact details. Performs validation of the request body against the addSchema defined in the contacts model. Calls the addContacts controller function to handle the creation of a new contact.

**PUT /:contactId:** Updates a specific contact by its ID. Requires authentication using a JWT token. Accepts a JSON payload containing the updated contact details. Performs validation of the request body against the addSchema defined in the contacts model. Calls the updateContacts controller function to handle the update of the contact.

**PATCH /:contactId/favorite:** Updates the favorite status of a specific contact by its ID. Requires authentication using a JWT token. Accepts a JSON payload containing the updated favorite status. Performs validation of the request body against the updateFavoriteSchema defined in the contacts model. Calls the updateStatusContact controller function to handle the update of the contact's favorite status.

**DELETE /:contactId:** Deletes a specific contact by its ID. Requires authentication using a JWT token. Calls the deleteContacts controller function to delete the contact by ID.

### Teams:

- `npm start` &mdash; server start in production mode
- `npm run start:dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors

