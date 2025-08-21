// index.js (middleware)
const { authenticate, authorizeRole } = require("../middleware");

module.exports = {
  authenticate,
  authorizeRole,
};
