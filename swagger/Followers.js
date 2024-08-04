/**
 * @swagger
 * tags:
 *   - name: Followers
 *     description: Routes for managing user followers
 */

/**
 * @swagger
 * paths:
 *   /user/follow:
 *     post:
 *       tags:
 *         - Followers
 *       summary: Follow a user
 *       description: Adds a user to another user's follower list.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   description: ID of the user to be followed
 *                   example: "12345"
 *                 follower:
 *                   type: string
 *                   description: ID of the user following
 *                   example: "67890"
 *       responses:
 *         200:
 *           description: User followed successfully
 *         400:
 *           description: Bad request, user and follower are required
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /user/unfollow/{id}:
 *     patch:
 *       tags:
 *         - Followers
 *       summary: Unfollow a user
 *       description: Removes a follower from a user's follower list.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the follower to be removed
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   description: ID of the user from whom the follower is removed
 *                   example: "12345"
 *       responses:
 *         200:
 *           description: User unfollowed successfully
 *         400:
 *           description: Bad request
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /user/deleteFollowers/{id}:
 *     delete:
 *       tags:
 *         - Followers
 *       summary: Remove all followers
 *       description: Deletes all followers from a user's follower list.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user whose followers will be deleted
 *       responses:
 *         200:
 *           description: All followers removed successfully
 *         400:
 *           description: Bad request
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /user/unfollowAll/{id}:
 *     patch:
 *       tags:
 *         - Followers
 *       summary: Unfollow everyone
 *       description: Removes a user as a follower from all other users.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user to unfollow from everyone
 *       responses:
 *         200:
 *           description: Unfollowed everyone successfully
 *         400:
 *           description: Bad request
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /user/followers/{id}:
 *     get:
 *       tags:
 *         - Followers
 *       summary: Get all followers
 *       description: Retrieves a list of all followers for a specific user.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user whose followers are retrieved
 *       responses:
 *         200:
 *           description: List of followers retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: string
 *                   followers:
 *                     type: array
 *                     items:
 *                       type: string
 *         400:
 *           description: No followers found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /user/following/{id}:
 *     get:
 *       tags:
 *         - Followers
 *       summary: Get all following
 *       description: Retrieves a list of all users that a specific user is following.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user whose followings are retrieved
 *       responses:
 *         200:
 *           description: List of following retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: ID of the followed user
 *         400:
 *           description: No followings found
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /user/followRequest/{id}:
 *     get:
 *       tags:
 *         - Followers
 *       summary: Retrieve follow requests for a user
 *       description: Fetches all follow requests sent to the specified user ID, sorted by creation date.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the user for whom follow requests are being retrieved.
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Successful retrieval of follow requests
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the follow request.
 *                     to:
 *                       $ref: '#/components/schemas/User'
 *                     requestedBy:
 *                       $ref: '#/components/schemas/User'
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the follow request was created.
 *         400:
 *           description: No follow requests available or error occurred
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "No requests available"
 *         500:
 *           description: Internal server error
 */

/**
 * @swagger
 * paths:
 *   /user/acceptFollows/{id}:
 *     patch:
 *       tags:
 *         - Followers
 *       summary: Accept or decline follow request
 *       description: Accepts or declines a follow request based on the provided request ID. If accepted, updates the followers list.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the follow request to be accepted or declined.
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isAccepted:
 *                   type: boolean
 *                   description: Whether the follow request is accepted (true) or declined (false).
 *                   example: true
 *                 user:
 *                   type: string
 *                   description: The ID of the user who sent the follow request.
 *                   example: "userId123"
 *                 follower:
 *                   type: string
 *                   description: The ID of the user who is following.
 *                   example: "followerId123"
 *               required:
 *                 - isAccepted
 *                 - user
 *                 - follower
 *       responses:
 *         200:
 *           description: Successfully accepted or declined the follow request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "You accepted the follow request"
 *         400:
 *           description: Error occurred during the request processing
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Couldn't process the request"
 *         500:
 *           description: Internal server error
 */
