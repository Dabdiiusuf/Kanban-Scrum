const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ticketsRouter = require("./routes/tickets");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
