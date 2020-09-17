const express = require("express")
const mongoose = require("mongoose")
const app = express()
const morgan = require("morgan")
const UrlShort = require("./models/url")

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
// app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.get("/", async (req, res) => {
  const response = await UrlShort.find()
  res.render("index", { urls: response })
})

app.post("/createshort", (req, res) => {
  console.log(req.body)
  UrlShort.create(req.body, (err, response) => {
    if (err) {
      return console.log(err)
    }
    console.log(response)
  })
  res.redirect("/")
})

app.get("/:short", async (req, res) => {
  const response = await UrlShort.findOne({ short: req.params.short })
  if (response === null) {
    return res.send("NOT FOUND")
  }
  response.clicks++
  response.save()
  res.redirect(response.fullurl)
})

const uri = `mongodb://localhost:27017/urlshortner`
mongoose.connect(
  uri,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) {
      console.log(err)
    }
    console.log("mongo connected successfully")
  }
)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})
