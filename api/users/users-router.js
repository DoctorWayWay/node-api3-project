// ===== IMPORTS =====
const express = require('express')
const Users = require("./users-model")
const Posts = require("../posts/posts-model")
const {
  validateUserId,
  validateUser,
  validatePost,
  handleError, } = require("../middleware/middleware")
const { restart } = require('nodemon')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

// ===== INSTANCE OF EXPRESS =====
const router = express.Router();

// ===== ENDPOINTS =====
router.get('/', async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await Users.get()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
});

router.get('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const { id } = req.params
    const user = await Users.getById(id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use(handleError)

// do not forget to export the router
module.exports = router
