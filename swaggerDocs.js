/**
 * @swagger
 * tags:
 *   name: User
 *   description: 회원가입 및 로그인 기능 관련 API
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: 회원가입
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               password:
 *                 type: string
 *               checkPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 회원가입 성공
 *       '400':
 *         description: 잘못된 요청 또는 입력값 오류
 *       '409':
 *         description: 이미 존재하는 사용자
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 로그인
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 로그인 성공
 *       '404':
 *         description: 사용자를 찾을 수 없음
 */
// ===============================================
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: 게시글 관련 API
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 전체 게시글 조회
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: 전체 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // 내용 생략
 */

/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: 글 생성
 *     tags: [Posts]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post_id:
 *                   type: string
 */

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: 글 조회
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post:
 *                   type: object
 *                   properties:
 *                     // 내용 생략
 *       '404':
 *         description: 글을 찾을 수 없음
 */

/**
 * @swagger
 * /posts/{postId}:
 *   patch:
 *     summary: 글 수정
 *     tags: [Posts]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post_id:
 *                   type: string
 *       '404':
 *         description: 글을 찾을 수 없음
 *       '403':
 *         description: 권한이 없음
 */

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: 글 삭제
 *     tags: [Posts]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       '404':
 *         description: 글을 찾을 수 없음
 *       '403':
 *         description: 권한이 없음
 */
// ===============================================

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: 댓글 관련 API
 */

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: 댓글 조회
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 댓글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 findComments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // 내용 생략
 *       '400':
 *         description: 글이 없음
 */

/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *     summary: 댓글 작성
 *     tags: [Comments]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 댓글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 comment_id:
 *                   type: string
 *       '400':
 *         description: 글이 없음
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   patch:
 *     summary: 댓글 수정
 *     tags: [Comments]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reqContent:
 *                 type: string
 *     responses:
 *       '200':
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 comment_id:
 *                   type: string
 *       '403':
 *         description: 권한이 없음
 */

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: 댓글 삭제
 *     tags: [Comments]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       '400':
 *         description: 에러 발생
 */