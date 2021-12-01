// ===== IMPORTS =====
const express = require('express');
const usersRouter = require("./users/users-router")

// remember express by default cannot parse JSON in request bodies
// ===== INSTANCE OF EXPRESS =====
const server = express();

// global middlewares and the user's router need to be connected here
// ===== GLOBAL MIDDLEWARE =====
server.use(express.json())

// ===== ROUTES =====
server.use("/api/users", usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
