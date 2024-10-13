const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require("../../controllers/user-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

// put authMiddleware anywhere we need to send a token for verification of user
router.route("/").post(createUser).put(authMiddleware, saveBook);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

router.route("/books/:bookId").delete(authMiddleware, deleteBook);

module.exports = router;

////TODO:
// 1. /login as post
// 2. /logout as post
// 3. /signup as post
// 4. /id as get
// 5. /id as a put to update user
// 6. /id/list as a post to create a list
// 7. /id/list as a put to update a list
