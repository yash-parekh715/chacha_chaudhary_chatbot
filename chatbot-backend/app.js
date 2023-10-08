const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5000",
  })
);

app.post("/chat", async (req, res) => {
  try {
    const user_input = req.body.user_input;
    const response = await axios.post("http://127.0.0.1:5000/chatbot", {
      user_input,
    });
    res.send(response.data.response);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(port, () => {
  // console.log(`Node.js server is running on port ${port}`);
  console.log(`server running http://127.0.0.1:${port}`);
});
