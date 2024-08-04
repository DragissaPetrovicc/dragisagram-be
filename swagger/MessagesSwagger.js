/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API endpoints for handling messages.
 */

/**
 * @swagger
 * /message/send:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
 *       description: Data for sending a new message.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *                 description: ID of the user sending the message.
 *               content:
 *                 type: string
 *                 description: Content of the message.
 *               chat:
 *                 type: string
 *                 description: ID of the chat where the message is sent.
 *     responses:
 *       200:
 *         description: Message sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Sent"
 *       400:
 *         description: Invalid request data or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Couldn't identify you, make sure you are logged in"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't send message"
 */

/**
 * @swagger
 * /message/allMessagesForChat/{id}:
 *   get:
 *     summary: Get all messages for a chat
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the chat to fetch messages for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Messages fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   sender:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   content:
 *                     type: string
 *                   chat:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       users:
 *                         type: array
 *                         items:
 *                           type: string
 *       400:
 *         description: Invalid chat ID or no messages found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You didn't provide for what chat you are fetching messages"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't fetch messages"
 */

/**
 * @swagger
 * /message/delete/{id}:
 *   delete:
 *     summary: Delete a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the message to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message deleted successfully"
 *       400:
 *         description: Invalid message ID or message not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You didn't provide what message you want to delete"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't delete message"
 */

/**
 * @swagger
 * /message/edit/{id}:
 *   patch:
 *     summary: Edit a message
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the message to edit.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Data for editing a message.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: New content for the message.
 *     responses:
 *       200:
 *         description: Message updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message updated successfully"
 *       400:
 *         description: Invalid message ID or missing content.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You have to edit comment first"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong, couldn't edit message"
 */
