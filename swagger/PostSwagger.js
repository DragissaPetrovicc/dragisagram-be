/**
 * @swagger
 * /post/savePost/{id}:
 *   put:
 *     summary: Save posts for a user
 *     description: Save one or more posts for a user. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to save posts for
 *         example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     requestBody:
 *       description: List of post IDs to be saved
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               posts:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of post IDs to save
 *                 example: ["60b6a2d2e3b3b7a9c8b6a2d2", "60b6a2d2e3b3b7a9c8b6a3d3"]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Posts saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Post saved successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingOwner:
 *                   summary: Missing user ID
 *                   value: "Make sure you are logged in, couldn't identify you"
 *                 emptyPosts:
 *                   summary: No posts provided
 *                   value: "At least one post is required"
 *                 postNotFound:
 *                   summary: Post not found
 *                   value: "Provided post {post} doesn't exist"
 *                 updateFailed:
 *                   summary: Failed to update saved posts
 *                   value: "Something went wrong, couldn't add post in saved posts"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/savedPosts/{id}:
 *   get:
 *     summary: Get saved posts for a user
 *     description: Retrieve all saved posts for a user by their ID. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to fetch saved posts for
 *         example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Saved posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   owner:
 *                     type: string
 *                     description: User ID who saved the posts
 *                     example: 60b6a2d2e3b3b7a9c8b6a2d2
 *                   posts:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of post IDs saved by the user
 *                     example: ["60b6a2d2e3b3b7a9c8b6a2d2", "60b6a2d2e3b3b7a9c8b6a3d3"]
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingOwner:
 *                   summary: Missing user ID
 *                   value: "Make sure you are logged in, couldn't identify you"
 *                 noSavedPosts:
 *                   summary: No saved posts
 *                   value: "You still have not saved posts"
 *                 fetchFailed:
 *                   summary: Failed to fetch saved posts
 *                   value: "Something went wrong, couldn't fetch your saved posts"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/unsavePost/{id}:
 *   patch:
 *     summary: Unsave a post for a user
 *     description: Remove a specific post from the saved posts list for a user. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to unsave the post from
 *         example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     requestBody:
 *       description: ID of the post to be removed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 type: string
 *                 description: ID of the post to remove
 *                 example: 60b6a2d2e3b3b7a9c8b6a3d3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post removed from saved posts successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Post 60b6a2d2e3b3b7a9c8b6a3d3 removed from your saved posts successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingOwner:
 *                   summary: Missing user ID
 *                   value: "Make sure you are logged in, couldn't identify you"
 *                 missingPost:
 *                   summary: No post provided
 *                   value: "Post is required"
 *                 noSavedPosts:
 *                   summary: No saved posts found
 *                   value: "No saved posts found for this user"
 *                 postNotFound:
 *                   summary: Post not found in saved posts
 *                   value: "Post not found in your saved posts"
 *                 fetchFailed:
 *                   summary: Failed to fetch saved posts
 *                   value: "Something went wrong, couldn't fetch your saved posts"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/make:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with images, description, and optional tags. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     requestBody:
 *       description: Details of the post to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *                 description: ID of the user creating the post
 *                 example: 60b6a2d2e3b3b7a9c8b6a2d2
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of image URLs or file paths
 *                 example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *               description:
 *                 type: string
 *                 description: Description of the post
 *                 example: "This is a sample post description."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of tags associated with the post
 *                 example: ["@tag1", "@tag2"]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "New post was created by username"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingOwner:
 *                   summary: Missing user ID
 *                   value: "We couldn't identify you"
 *                 missingImages:
 *                   summary: No images provided
 *                   value: "At least one image is required"
 *                 invalidTags:
 *                   summary: Invalid tags format
 *                   value: "Tags must start with `@`"
 *                 userNotFound:
 *                   summary: User not found
 *                   value: "We couldn't identify you"
 *                 postCreationFailed:
 *                   summary: Post creation failed
 *                   value: "Couldn't make a new post, try again later"
 *                 creationFailed:
 *                   summary: Failed to create post
 *                   value: "Something went wrong, couldn't make new post"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/likePost/{id}:
 *   patch:
 *     summary: Like a post
 *     description: Increment the like count of a post. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to be liked
 *         schema:
 *           type: string
 *           example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Post 60b6a2d2e3b3b7a9c8b6a2d2 liked successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingPostId:
 *                   summary: Missing post ID
 *                   value: "You didn't provide what post you are trying to like"
 *                 likeFailed:
 *                   summary: Failed to like post
 *                   value: "Couldn't like post"
 *                 error:
 *                   summary: General error
 *                   value: "Something went wrong, couldn't like specified post"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/unlikePost/{id}:
 *   patch:
 *     summary: Unlike a post
 *     description: Decrement the like count of a post. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to be unliked
 *         schema:
 *           type: string
 *           example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post unliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Post 60b6a2d2e3b3b7a9c8b6a2d2 unliked successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingPostId:
 *                   summary: Missing post ID
 *                   value: "You didn't provide what post you are trying to like"
 *                 unlikeFailed:
 *                   summary: Failed to unlike post
 *                   value: "Couldn't unlike post"
 *                 error:
 *                   summary: General error
 *                   value: "Something went wrong, couldn't unlike specified post"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/sharePost/{id}:
 *   patch:
 *     summary: Share a post
 *     description: Increment the share count of a post. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to be shared
 *         schema:
 *           type: string
 *           example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post shared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Post 60b6a2d2e3b3b7a9c8b6a2d2 shared successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 missingPostId:
 *                   summary: Missing post ID
 *                   value: "You didn't provide what post you are trying to share"
 *                 shareFailed:
 *                   summary: Failed to share post
 *                   value: "Couldn't share post"
 *                 error:
 *                   summary: General error
 *                   value: "Something went wrong, couldn't share specified post"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/allPosts:
 *    get:
 *     summary: Get all posts visible to a user
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user requesting posts.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched all posts visible to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   owner:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   content:
 *                     type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   postedAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: No posts available or user not following anyone.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You cannot see any posts, follow someone"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Couldn't fetch any posts, try again later"
 */

/**
 * @swagger
 * /post/allPosts/{id}:
 *   get:
 *     summary: Get posts for a specific user
 *     description: Fetch all posts by a specific user, sorted by posting date in descending order. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user whose posts are to be fetched
 *         schema:
 *           type: string
 *           example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of posts for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '400':
 *         description: User not found or no posts available
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 userNotFound:
 *                   summary: User does not exist
 *                   value: "Specified user doesn't exist"
 *                 noPosts:
 *                   summary: No posts available for user
 *                   value: "There is no posts available for specified user at the moment"
 *                 fetchError:
 *                   summary: Error fetching posts
 *                   value: "Couldn't fetch any post for specified user, try again later"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60b6a2d2e3b3b7a9c8b6a2d2
 *         owner:
 *           $ref: '#/components/schemas/User'
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             example: "https://example.com/image.jpg"
 *         description:
 *           type: string
 *           example: "This is a sample post description"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             example: "@tag1"
 *         postedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-07-25T10:00:00Z"
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 60b6a2d2e3b3b7a9c8b6a2d2
 *         username:
 *           type: string
 *           example: "john_doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         firstName:
 *           type: string
 *           example: "John"
 *         phoneNumber:
 *           type: string
 *           example: "+1234567890"
 *         role:
 *           type: string
 *           example: "USER"
 */

/**
 * @swagger
 * /post/edit/{id}:
 *   patch:
 *     summary: Edit a post
 *     description: Update the description or tags of a specific post. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to be updated
 *         schema:
 *           type: string
 *           example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     requestBody:
 *       description: Data to update the post
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Updated description of the post"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "@newTag"
 *             required:
 *               - description
 *               - tags
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Post 60b6a2d2e3b3b7a9c8b6a2d2 updated successfully"
 *       '400':
 *         description: Error updating post or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 noFields:
 *                   summary: All fields are empty
 *                   value: "Couldn't edit post because all fields are empty"
 *                 invalidTags:
 *                   summary: Invalid tags format
 *                   value: "Tags must start with `@`"
 *                 postNotFound:
 *                   summary: Post does not exist
 *                   value: "Couldn't update specified post because post doesn't exist"
 *                 updateError:
 *                   summary: Error updating post
 *                   value: "Something went wrong, couldn't edit specified post"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/delete/{id}:
 *   delete:
 *     summary: Delete a post
 *     description: Remove a post by its ID. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to be deleted
 *         schema:
 *           type: string
 *           example: 60b6a2d2e3b3b7a9c8b6a2d2
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Specified post deleted successfully"
 *       '400':
 *         description: Error deleting post or post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 noPostId:
 *                   summary: No post ID provided
 *                   value: "You didn't provide what post you are trying to delete"
 *                 postNotFound:
 *                   summary: Post not found
 *                   value: "Specified post doesn't exist"
 *                 deleteError:
 *                   summary: Error deleting post
 *                   value: "Couldn't delete this post"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/comment:
 *   post:
 *     summary: Create a comment
 *     description: Add a comment to a specific post. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     requestBody:
 *       description: Data to create a comment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentedBy:
 *                 type: string
 *                 example: 60b6a2d2e3b3b7a9c8b6a2d2
 *               commentedPost:
 *                 type: string
 *                 example: 60b6a2d2e3b3b7a9c8b6a2d3
 *               comment:
 *                 type: string
 *                 example: "This is a comment."
 *             required:
 *               - commentedBy
 *               - commentedPost
 *               - comment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Commenter successfully"
 *       '400':
 *         description: Error creating comment or missing data
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 noCommentedBy:
 *                   summary: User not identified
 *                   value: "Couldn't identify you, make sure you are logged in"
 *                 noCommentedPost:
 *                   summary: No post specified
 *                   value: "You didn't provide what post you are commenting"
 *                 noComment:
 *                   summary: Missing comment
 *                   value: "Comment field is required"
 *                 userNotFound:
 *                   summary: User not found
 *                   value: "Your account doesn't exist anymore, log in again"
 *                 postNotFound:
 *                   summary: Post not found
 *                   value: "Couldn't find post you trying to comment"
 *                 commentError:
 *                   summary: Error posting comment
 *                   value: "Couldn't post your comment, try again later"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/comment:
 *   delete:
 *     summary: Delete a comment
 *     description: Remove a specific comment by its ID. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     requestBody:
 *       description: Data to delete a comment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *                 example: 60b6a2d2e3b3b7a9c8b6a2d4
 *             required:
 *               - commentId
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Comment deleted successfully"
 *       '400':
 *         description: Error deleting comment or comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 noCommentId:
 *                   summary: No comment ID provided
 *                   value: "You didn't provide what comment you are deleting"
 *                 commentNotFound:
 *                   summary: Comment not found
 *                   value: "Provided comment doesn't exist"
 *                 deleteError:
 *                   summary: Error deleting comment
 *                   value: "Couldn't delete your comment, try again later"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /post/comment:
 *   patch:
 *     summary: Update a comment
 *     description: Edit a specific comment by its ID. Requires user role authentication.
 *     tags:
 *       - Manipulate Post
 *     requestBody:
 *       description: Data to update a comment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "Updated comment text."
 *               commentId:
 *                 type: string
 *                 example: 60b6a2d2e3b3b7a9c8b6a2d4
 *             required:
 *               - comment
 *               - commentId
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Comment updated successfully"
 *       '400':
 *         description: Error updating comment or comment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               examples:
 *                 noComment:
 *                   summary: No comment provided
 *                   value: "You have to edit comment first"
 *                 commentNotFound:
 *                   summary: Comment not found
 *                   value: "Provided comment doesn't exist"
 *                 updateError:
 *                   summary: Error updating comment
 *                   value: "Couldn't update your comment, try again later"
 *     components:
 *       securitySchemes:
 *         bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */
