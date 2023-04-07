const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:3000/app/",
});
module.exports = api;
