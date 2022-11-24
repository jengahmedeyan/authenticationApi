const getApiKey = () => {
  return [...Array(30)]
    .map((item) => ((Math.random() * 36) | 0).toString(36))
    .join("");
};
module.exports = { getApiKey };
