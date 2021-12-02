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
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
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
