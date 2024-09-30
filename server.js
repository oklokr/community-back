const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};
const PORT = process.env.PORT || 8080;

// Set CORS option
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./app/mongodb/route/route.ts"));

const db = require("./app/mongodb/model/index.ts");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db.url", db.url);
    console.log("db.mongoose", db.mongoose);
    console.log("db.tutorial.db", db.tutorial.db);
    console.log("Database Connection Success.");
  })
  .catch((err) => {
    console.log("Database Connection Failure.", err);
    process.exit();
  });

// Default route for server status
app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

// Set listen port for request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
