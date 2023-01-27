const mongoose = require("mongoose");
// id have to be same or Collectiontable name have to be same
const productSchema = new mongoose.Schema({
    Name: String,
    Price: String,
    Category: String,
    UserID: String,
    Company: String

})
module.exports = mongoose.model("products", productSchema);