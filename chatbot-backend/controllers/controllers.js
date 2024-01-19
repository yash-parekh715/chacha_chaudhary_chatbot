const axios =  require('axios')
const {default: mongoose} = require('mongoose')
const dropBoxSchema = require("../models/schema")

const chat = async (req, res) => {
    try {
      const user_input = req.body.user_input;
      const response = await axios.post("http://127.0.0.1:5000/chatbot", {
        user_input,
      });
      return res.send(response.data.response);
    } catch (error) {
      console.error(error);
      return res.status(500).send("An error occurred");
    }
  }

const dropBox = async(req, res) => {
}

module.exports = {
    chat,
    dropBox
}