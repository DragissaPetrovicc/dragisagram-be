/**
 * @swagger
 * /register/user:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint creates a new user account with the provided details.
 *     tags:
 *       - Manipulate Users
 *     requestBody:
 *       description: User details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *                 example: Doe
 *               username:
 *                 type: string
 *                 description: Unique username for the user
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: johndoe@example.com
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *                 example: "+387 12123123"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: securepassword123
 *               image:
 *                 type: string
 *                 format: uri
 *                 description: URL of the user's profile image
 *                 example: "https://example.com/images/user.jpg"
 *               role:
 *                 type: string
 *                 description: Role of the user
 *                 example: "user"
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 data:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       example: Doe
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     phoneNumber:
 *                       type: string
 *                       example: "+387 12123123"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/images/user.jpg"
 *                     role:
 *                       type: string
 *                       example: "user"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Firstname is required"
 */

/**
 * @swagger
 * /register/createVerification:
 *   post:
 *     summary: Create a verification code
 *     description: Generate a verification code and send it to the user's email or phone number.
 *     tags:
 *       - Manipulate Users
 *     requestBody:
 *       description: User contact details for verification
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *                 example: "+387 12123123"
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: johndoe@example.com
 *     responses:
 *       '200':
 *         description: Verification code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Verification code sent to your email successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingContact:
 *                   summary: No contact information provided
 *                   value: "We couldn't find you"
 *                 emailSendError:
 *                   summary: Error sending email
 *                   value: "Couldn't register you, try again later"
 */

/**
 * @swagger
 * /register/verify:
 *   post:
 *     summary: Verify user with a code
 *     description: Verify a user by checking the provided code sent to either email or phone number.
 *     tags:
 *       - Manipulate Users
 *     requestBody:
 *       description: Details for verification
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address (optional if phoneNumber is provided)
 *                 example: johndoe@example.com
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number (optional if email is provided)
 *                 example: "+387 12123123"
 *               code:
 *                 type: string
 *                 description: Verification code
 *                 example: "123456"
 *     responses:
 *       '200':
 *         description: User verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User verified successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingCode:
 *                   summary: Missing verification code
 *                   value: "Missing verification code"
 *                 incorrectCode:
 *                   summary: Incorrect verification code
 *                   value: "Incorrect code"
 *                 userNotFound:
 *                   summary: User not found
 *                   value: "Couldn't find user with specified email address"
 *                 verificationFailed:
 *                   summary: Verification process failed
 *                   value: "Verification failed"
 */

/**
 * @swagger
 * /login/user:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticates a user by checking the provided username and password. Returns a JWT token upon successful authentication.
 *     tags:
 *       - Manipulate Users
 *     requestBody:
 *       description: User's login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's unique username
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: securepassword123
 *     responses:
 *       '200':
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID
 *                       example: 60b6a2d2e3b3b7a9c8b6a2d2
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     role:
 *                       type: string
 *                       example: "user"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingUsername:
 *                   summary: Missing username
 *                   value: "Username is required"
 *                 missingPassword:
 *                   summary: Missing password
 *                   value: "Password is required"
 *                 userNotFound:
 *                   summary: User not found
 *                   value: "User not found"
 *                 incorrectPassword:
 *                   summary: Incorrect password
 *                   value: "Incorrect password"
 *                 loginFailed:
 *                   summary: Login failed
 *                   value: "Couldn't login user"
 */

/**
 * @swagger
 * /user/search:
 *   get:
 *     summary: Search for users
 *     description: Search for users by username or first name. Requires user role authentication.
 *     tags:
 *       - Manipulate Users
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for username or first name
 *         example: johndoe
 *       - in: body
 *         name: owner
 *         schema:
 *           type: string
 *         required: false
 *         description: User ID of the owner to exclude from the search results
 *         example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Users found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: User ID
 *                     example: 60b6a2d2e3b3b7a9c8b6a2d2
 *                   username:
 *                     type: string
 *                     description: User's unique username
 *                     example: johndoe
 *                   firstName:
 *                     type: string
 *                     description: User's first name
 *                     example: John
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 emptySearch:
 *                   summary: Empty search field
 *                   value: "Search field is empty"
 *                 userNotFound:
 *                   summary: No users found
 *                   value: "Specified user doesn't exist"
 *                 searchError:
 *                   summary: Error during search
 *                   value: "Something went wrong, couldn't find specified user"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /user/edit/{id}:
 *   patch:
 *     summary: Edit user details
 *     description: Update user details by user ID. Requires user role authentication.
 *     tags:
 *       - Manipulate Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to be edited
 *         example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     requestBody:
 *       description: User details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password for the user
 *                 example: newpassword123
 *               username:
 *                 type: string
 *                 description: New username for the user
 *                 example: newusername
 *               email:
 *                 type: string
 *                 description: New email address for the user
 *                 example: newemail@example.com
 *               phoneNumber:
 *                 type: string
 *                 description: New phone number for the user
 *                 example: "+387 12123123"
 *               firstName:
 *                 type: string
 *                 description: New first name for the user
 *                 example: John
 *               role:
 *                 type: string
 *                 description: New role for the user (e.g., "ADMIN")
 *                 example: "ADMIN"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User newusername updated successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingId:
 *                   summary: Missing user ID
 *                   value: "You didn't provide what user you are editing"
 *                 emptyFields:
 *                   summary: No fields provided for update
 *                   value: "All fields are empty"
 *                 shortPassword:
 *                   summary: Password too short
 *                   value: "Password must be at least 6 characters long"
 *                 shortUsername:
 *                   summary: Username too short
 *                   value: "Username must be at least 6 characters long"
 *                 usernameUsed:
 *                   summary: Username already used
 *                   value: "Username is already used"
 *                 invalidEmail:
 *                   summary: Invalid email format
 *                   value: "Email is invalid (someemail@gmail.com)"
 *                 emailUsed:
 *                   summary: Email already used
 *                   value: "Email is already used"
 *                 invalidPhoneNumber:
 *                   summary: Invalid phone number format
 *                   value: "Phone number is invalid (+387000111)"
 *                 phoneNumberUsed:
 *                   summary: Phone number already used
 *                   value: "Phone number is already used"
 *                 userNotFound:
 *                   summary: User not found
 *                   value: "Couldn't update user because user doesn't exist"
 *                 updateFailed:
 *                   summary: Update failed
 *                   value: "Something went wrong, so couldn't edit specified user"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID. Requires user role authentication.
 *     tags:
 *       - Manipulate Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to be deleted
 *         example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User 60b6a2d2e3b3b7a9c8b6a2d2 deleted successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingId:
 *                   summary: Missing user ID
 *                   value: "You didn't provide what user you are trying to delete"
 *                 deletionFailed:
 *                   summary: Deletion failed
 *                   value: "Something went wrong, couldn't delete user"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /user/blockUser/{id}:
 *   post:
 *     summary: Block a user
 *     description: Block a user by adding them to the blocklist of the specified owner.
 *     tags:
 *       - Manipulate Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the owner who wants to block the user
 *         example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     requestBody:
 *       description: User to be blocked
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user to be blocked
 *                 example: 60b6a2d2e3b3b7a9c8b6a2d3
 *     responses:
 *       '200':
 *         description: User blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User blocked successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Something went wrong, couldn't block user"
 */

/**
 * @swagger
 * /user/blockList/{id}:
 *   get:
 *     summary: Get blocklist
 *     description: Retrieve the blocklist of users blocked by the specified owner.
 *     tags:
 *       - Manipulate Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the owner whose blocklist is being retrieved
 *         example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     responses:
 *       '200':
 *         description: Blocklist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 owner:
 *                   type: string
 *                   description: ID of the owner
 *                   example: 60b6a2d2e3b3b7a9c8b6a2d2
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID of the blocked user
 *                         example: 60b6a2d2e3b3b7a9c8b6a2d3
 *                       username:
 *                         type: string
 *                         description: Username of the blocked user
 *                         example: blockeduser
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Something went wrong, couldn't fetch blocklist"
 */

/**
 * @swagger
 * /user/unblockUser/{id}:
 *   patch:
 *     summary: Unblock a user
 *     description: Unblock a user by removing them from the blocklist of the specified owner.
 *     tags:
 *       - Manipulate Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the owner who wants to unblock the user
 *         example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     requestBody:
 *       description: User to be unblocked
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user to be unblocked
 *                 example: 60b6a2d2e3b3b7a9c8b6a2d3
 *     responses:
 *       '200':
 *         description: User unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User unblocked successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Something went wrong, couldn't unblock user"
 */
