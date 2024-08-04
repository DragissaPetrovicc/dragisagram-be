/**
 * @swagger
 * tags:
 *   name: Followers
 *   description: API endpoints for managing followers.
 */

/**
 * @swagger
 * /user/follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Followers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user to be followed.
 *               follower:
 *                 type: string
 *                 description: ID of the user following.
 *     responses:
 *       200:
 *         description: User followed successfully.
 *       400:
 *         description: Bad request, user and follower are required.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /user/unfollow/{id}:
 *   patch:
 *     summary: Unfollow a user
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the follower to be removed.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID of the user from whom the follower is removed.
 *     responses:
 *       200:
 *         description: User unfollowed successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /user/deleteFollowers/{id}:
 *   delete:
 *     summary: Remove all followers
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose followers will be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All followers removed successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /user/unfollowAll/{id}:
 *   patch:
 *     summary: Unfollow everyone
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to unfollow from everyone.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unfollowed everyone successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /user/followers/{id}:
 *   get:
 *     summary: Get all followers
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose followers are retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of followers retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 followers:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: No followers found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /user/following/{id}:
 *   get:
 *     summary: Get all following
 *     tags: [Followers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose followings are retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of followings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: string
 *                     description: ID of the followed user.
 *       400:
 *         description: No followings found.
 *       500:
 *         description: Internal server error.
 */
