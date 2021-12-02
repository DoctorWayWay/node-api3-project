// ===== IMPORTS =====
const Users = require("../users/users-model")

function logger(req, res, next) {
  console.log(`
    REQ_METHOD: ${req.method}
    REQ_URL: ${req.url}
    REQ_TIME: ${new Date().toISOString()}
  `)
  next()
}

async function validateUserId(req, res, next) {
  const { id } = req.params
  const user = await Users.getById(id)
  if (user) {
    next()
  } else {
    next({ status: 404, message: "user not found" })
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
  if (name) {
    next()
  } else {
    next({ status: 400, message: "missing required name field" })
  }
}

async function validatePost(req, res, next) {
  try {
    const { text } = req.body
    if (text) {
      next()
    } else {
      next({ status: 400, message: "missing required text field" })
    }
  } catch (err) {
    next(err)
  }
}

// do not forget to expose these functions to other modules
function handleError(err, req, res, next) {
  res.status(err.status || 500).json({
    "message": `This is troubling... ${err.message}`
  })
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  handleError,
}
