Routes
Authenticate
POST /register: Creates a new user account. Accepts a JSON payload containing the user's email and password. Performs validation of the request body against the registerSchema defined in the users model. Calls the register controller function to handle the registration process.

GET /verify/:verificationToken: Verifies the user's email address using the provided verification token. Calls the verify controller function to handle the verification process.

POST /resend-verify-email: Resends the verification email to the user's email address. Accepts a JSON payload containing the user's email. Performs validation of the request body against the emailSchema defined in the users model. Calls the resendVerifyEmail controller function to handle the email resend process.

POST /login: Authenticates the user and generates a JWT token for authorization. Accepts a JSON payload containing the user's email and password. Performs validation of the request body against the loginSchema defined in the users model. Calls the login controller function to handle the login process.

GET /users/current: Retrieves the currently authenticated user's information. Requires authentication using a JWT token. Calls the getCurrent controller function to retrieve the user's information.

POST /logout: Logs out the currently authenticated user by invalidating their JWT token. Requires authentication using a JWT token. Calls the logout controller function to handle the logout process.

PATCH /users: Updates the subscription status of the currently authenticated user. Requires authentication using a JWT token. Accepts a JSON payload containing the new subscription status. Performs validation of the request body against the updateSubscriptionSchema defined in the users model. Calls the updateSubscription controller function to handle the update process.

PATCH /avatars: Updates the user's avatar image. Requires authentication using a JWT token. Accepts a file upload with the avatar field. Calls the updateAvatar controller function to handle the avatar update process.

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
