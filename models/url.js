const mongoose = require("mongoose")
const shortid = require("shortid")

const urlSchema = new mongoose.Schema({
  fullurl: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    default: shortid.generate(),
  },
  clicks: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model("UrlShort", urlSchema)
