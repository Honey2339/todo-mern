const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const User = require("./models/mongomodel")

const PORT = 5050
const MONGO_URL = "mongodb+srv://sky5:sky5@cluster0.6hcywcy.mongodb.net/"

const app = express()

app.use(express.json())
app.use(cors())

app.get("/todos", async (req, res) => {
  try {
    const todos = await User.find()
    res.json(todos)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to fetch todo" })
  }
})

app.delete("/todo/:id", async (req, res) => {
  const todoId = req.params.id
  try {
    await User.deleteOne({ _id: todoId })
    res.json({ msg: "Todo is deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete todo" })
  }
})

app.post("/todo", async (req, res) => {
  const { title, body } = req.body
  try {
    const user = await User.create({ title, body })
    res.status(200).json({ msg: "User with new todo created" })
  } catch (err) {
    console.log(err)
  }
})

mongoose
  .connect(MONGO_URL)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`The Server Is Running On ${PORT} And Database Is Connected`)
    })
  })
  .catch((err) => console.log(err))
