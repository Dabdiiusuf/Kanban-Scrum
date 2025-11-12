const express = require("express");
const router = express.Router();
const {
  getTickets,
  createTickets,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketsController");

router.get("/", getTickets);
router.post("/", createTickets);
router.patch("/:id", updateTicket);
router.delete("/:id", deleteTicket);

module.exports = router;
