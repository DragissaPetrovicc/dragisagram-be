/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API endpoints for reporting users and posts.
 */

/**
 * @swagger
 * /report/user:
 *   post:
 *     summary: Report a user
 *     tags: [Reports]
 *     requestBody:
 *       description: Data for reporting a user.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportedBy:
 *                 type: string
 *                 description: ID of the user making the report.
 *               reportedUser:
 *                 type: string
 *                 description: ID of the user being reported.
 *               reason:
 *                 type: string
 *                 description: Reason for reporting the user.
 *               additionalMessage:
 *                 type: string
 *                 description: Any additional information about the report.
 *     responses:
 *       200:
 *         description: User reported successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User reported successfully, thank you
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reason is required
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong, couldn't report specified user
 */

/**
 * @swagger
 * /report/post:
 *   post:
 *     summary: Report a post
 *     tags: [Reports]
 *     requestBody:
 *       description: Data for reporting a post.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportedBy:
 *                 type: string
 *                 description: ID of the user making the report.
 *               reportedPost:
 *                 type: string
 *                 description: ID of the post being reported.
 *               reason:
 *                 type: string
 *                 description: Reason for reporting the post.
 *               additionalMessage:
 *                 type: string
 *                 description: Any additional information about the report.
 *     responses:
 *       200:
 *         description: Post reported successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post reported successfully, thank you
 *       400:
 *         description: Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reason is required
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Something went wrong, couldn't report specified post
 */
