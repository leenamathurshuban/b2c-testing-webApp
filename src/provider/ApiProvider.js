const { default: axios } = require("axios");

const authHeader = {
  "Content-Type": "application/json",
  Authorization:
    "Basic " +
    btoa(process.env.WP_CONSUMER_KEY + ":" + process.env.WP_CONSUMER_SECRET),
};

const HTTP_SERVICE_CALL = async (url, method = "GET", body = "") => {
  try {
    const response = await axios({
      method,
      url,
      headers: authHeader,
      data: body,
    });
    return response.data;
  } catch (err) {
    // console.log(err);
    throw err?.response;
  }
};

module.exports = { HTTP_SERVICE_CALL };
