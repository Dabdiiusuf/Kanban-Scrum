const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketsController");

router.use(checkAuth);

router.get("/", getTickets);
router.post("/", createTicket);
router.patch("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
