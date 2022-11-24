const { users, countries } = require("../initialData");

const createCountry = (req, res) => {
  let country = {
    _id: Date.now(),
    name: req.params.country,
  };
  countries.push(country);
  res.status(201).send({ data: country });
};

const getCountry = (req, res) => {
  let today = new Date().toISOString().split("T")[0];
  res.status(200).send({ data: countries });
};

module.exports = {
  getCountry,
  createCountry,
};
