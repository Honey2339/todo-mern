const mongoose = require("mongoose")

const schema = mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
})

const User = mongoose.model("TODO-MERN", schema)

module.exports = User
