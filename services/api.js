const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const API_URL = process.env.API;
const api = axios.create({
  baseURL: API_URL,
});
module.exports = api;
