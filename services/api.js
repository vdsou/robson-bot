const axios = require("axios");

const api = axios.create({
  baseURL: "http://localhost:3000/app/commands/",
});
module.exports = api;
