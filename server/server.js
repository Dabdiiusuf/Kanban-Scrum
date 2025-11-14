require("dotenv").config();
const express = require("express");
const cors = require("cors");

const ticketsRouter = require("./routes/tickets");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/tickets", ticketsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
