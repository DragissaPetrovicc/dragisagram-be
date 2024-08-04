/**
 * @swagger
 * tags:
 *   name: Admin routes
 *   description: API endpoints for managing various administrative tasks.
 */

/**
 * @swagger
 * /admin/allRatings:
 *   get:
 *     summary: Get all star ratings
 *     tags: [Admin routes]
 *     responses:
 *       200:
 *         description: Successfully fetched all ratings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   ratedBy:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   rating:
 *                     type: number
 *                     format: float
 *                   ratedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: No ratings available or error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There is no rating available at the moment"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't fetch ratings"
 */

/**
 * @swagger
 * /admin/allUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Admin routes]
 *     responses:
 *       200:
 *         description: Successfully fetched all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       400:
 *         description: No users found or error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There are no existing users"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't fetch users"
 */

/**
 * @swagger
 * /admin/getPostReps:
 *   get:
 *     summary: Get all post reports
 *     tags: [Admin routes]
 *     responses:
 *       200:
 *         description: Successfully fetched all post reports.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   reportedBy:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   reportedPost:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: No post reports available or error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There are no post reports available"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't fetch post reports"
 */

/**
 * @swagger
 * /admin/getPostRep/{id}:
 *   get:
 *     summary: Get a specific post report
 *     tags: [Admin routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post report to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the specified post report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 reportedBy:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 reportedPost:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Report not found or error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Specified report doesn't exist"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't fetch specified post report"
 */

/**
 * @swagger
 * /admin/deletePostRep/{id}:
 *   delete:
 *     summary: Delete a post report
 *     tags: [Admin routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post report to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the post report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report deleted successfully"
 *       400:
 *         description: Report not found or error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You didn't provide what rep you are trying to delete"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't delete specified post report"
 */

/**
 * @swagger
 * /admin/deleteUserRep/{id}:
 *   delete:
 *     summary: Delete a user report
 *     tags: [Admin routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user report to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the user report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Report deleted successfully"
 *       400:
 *         description: Report not found or error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You didn't provide what rep you are trying to delete"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't delete specified user report"
 */

/**
 * @swagger
 * /admin/getUserRep/{id}:
 *   get:
 *     summary: Get a specific user report
 *     tags: [Admin routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user report to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the specified user report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 reportedBy:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 reportedUser:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Report not found or error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Specified user rep doesn't exist"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't fetch specified user report"
 */

/**
 * @swagger
 * /admin/getUserReps:
 *   get:
 *     summary: Get all user reports
 *     tags: [Admin routes]
 *     responses:
 *       200:
 *         description: Successfully fetched all user reports.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   reportedBy:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   reportedUser:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: No user reports available or error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There are no user reports available"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't fetch user reports"
 */

/**
 * @swagger
 * /admin/sendNotification/{id}:
 *   post:
 *     summary: Send a notification to all users
 *     tags: [Admin routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the admin user sending the notification.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Notification message to send.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *                 description: The message to send as notification.
 *     responses:
 *       200:
 *         description: Successfully sent the notification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notification sent successfully"
 *       400:
 *         description: Missing message or error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Important message is required for this important notification"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't send notification"
 */
