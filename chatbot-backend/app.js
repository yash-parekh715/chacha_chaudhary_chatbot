const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
require("dotenv").config();

const app = express();
port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", routes);

// app.post("/chat", async (req, res) => {
//   try {
//     const user_input = req.body.user_input;
//     const response = await axios.post("http://127.0.0.1:5000/chatbot", {
//       user_input,
//     });
//     res.send(response.data.response);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred");
//   }
// });

// mongoose
//   .connect(process.env.MONG_URI)
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`db connected and listening on the port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log(`db not connected due to error:- ${err}`);
//   });

app.listen(port, () => {
  console.log(
    `server connected and listening on port http://127.0.0.1:${port}`
  );
});
