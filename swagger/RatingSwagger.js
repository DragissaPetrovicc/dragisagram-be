/**
 * @swagger
 * tags:
 *   name: Rating
 *   description: API endpoints for rating the application.
 */

/**
 * @swagger
 * /rating/rateApp:
 *   post:
 *     summary: Rate the application
 *     tags: [Rating]
 *     requestBody:
 *       description: Data for rating the application.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ratedBy:
 *                 type: string
 *                 description: ID of the user providing the rating.
 *               stars:
 *                 type: integer
 *                 format: int32
 *                 description: Number of stars given by the user (e.g., 1 to 5).
 *     responses:
 *       200:
 *         description: Rating submitted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thank you John for rating our application"
 *       400:
 *         description: Invalid request data or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Some required fields are missing: ratedBy or stars"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Couldn't rate app, try again later"
 */
