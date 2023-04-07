const api = require("./api");
const apiRequest = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    return error;
  }
};
module.exports = apiRequest();
