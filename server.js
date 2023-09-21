console.log("May Node be with you");

const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI;

MongoClient.connect(uri).then((client) => {
  console.log("connected to the database");

  const db = client.db("star-wars-quotes");
  const quotesCollection = db.collection("quotes");
  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static("public"));

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.get("/quotes", (req, res) => {
    const cursor = quotesCollection
      .find()
      .toArray()
      .then((results) => {
        res.render("index.ejs", { quotes: results });
      })
      .catch((error) => console.error(error));
    console.log(cursor);
  });
  app.post("/quotes", (req, res) => {
    quotesCollection
      .insertOne(req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((error) => console.log(error));
  });
  app.put("/quotes", async (req, res) => {
    quotesCollection
      .findOneAndUpdate(
        {
          name: "Cure",
        },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote,
          },
        },
        {
          upsert: true,
        }
      )
      .then((result) => {
        res.json("Success");
      })
      .catch((error) => console.error(error));
  });
  app.delete("/quotes", (req, res) => {
    quotesCollection
      .deleteOne({ name: req.body.name })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.json("No quote to delete");
        }
        res.json("Deleted quote");
      })
      .catch((error) => console.error(error));
  });

  app.listen(3000, () => {
    console.log("listening at http://localhost:3000");
  });
});
