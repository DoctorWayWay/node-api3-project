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

router.post('/', validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const newUser = await Users.insert(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
});

router.put('/:id',
  validateUserId,
  validateUser,
  async (req, res, next) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    try {
      const { id } = req.params
      const updatedUser = await Users.update(id, req.body)
      res.status(200).json(updatedUser)
    } catch (error) {
      next(error)
    }
  });

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const { id } = req.params
    const deletedUser = await Users.getById(id)
    await Users.remove(id)
    res.status(200).json(deletedUser)
  } catch (error) {
    next(error)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const userPosts = await Users.getUserPosts(req.params.id)
    res.status(200).json(userPosts)
  } catch (error) {
    next(error)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const { id } = req.params
    const { text } = req.body
    const newUserPost = await Posts.insert({ text, user_id: id })
    res.status(201).json(newUserPost)
  } catch (error) {
    next(error)
  }
});

router.use(handleError)

// do not forget to export the router
module.exports = router
