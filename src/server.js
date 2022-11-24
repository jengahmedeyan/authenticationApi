const express = require("express");
const app = express();
const port = 5000;
const API = require("./auth/apiAuth");

const { users, countries } = require("./initialData");
const { createUser, authenticateKey } = require("./auth/apiAuth");
const { createCountry, getCountry } = require("./routes/country.route");

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .send({ data: { message: "show a list of all the countries " } });
});

app.post("/api/register", (req, res) => {
  let username = req.body.username;
  let user = createUser(username, req);
  res.status(201).send({ data: user });
});

app.get("/api/country", getCountry);

app.post("/api/country", authenticateKey, createCountry);
app.listen(port, (err) => {
  if (err) {
    console.error("The server has an error starting ");
    return;
  }
  console.log("Server listening on port " + port);
});
