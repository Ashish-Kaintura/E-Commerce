const express = require("express");
const cors = require("cors");
require("./db/Config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
const port =process.env.PORT||  5000;

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.Password;
    resp.send(result);
});

app.post("/login", async (req, resp) => {
    if (req.body.Password && req.body.Email) {
        let user = await User.findOne(req.body).select("-Password");

        if (user) {
            resp.send(user);
        } else {
            resp.send({ result: "usernot found" });
        }
    } else {
        resp.send({ result: "usernot found" });
    }
});

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "no products found" });
    }
});
app.delete("/products/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

app.get("/products/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "no record found" });
    }
});
app.put("/products/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    resp.send(result);
});

app.get("/search/:key", async (req, resp) => {
    let result = await Product.find({
         "$or": [
            {
                Name: { $regex: req.params.key }
            },
            {
                Company: { $regex: req.params.key },
            }
        ],
    });
    resp.send(result);
});

app.listen(port, () => {
    console.log(`example app listining at http:localhost:${port}`);
});
