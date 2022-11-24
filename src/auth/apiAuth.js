const { users } = require("./../initialData");
const { getApiKey } = require("./../Index");

const createUser = (_username, req) => {
  let today = new Date().toISOString().split("T")[0];
  let user = {
    _id: Date.now(),
    api_key: getApiKey,
    username: _username,
    usage: [{ date: today, count: 0 }],
  };

  users.push(user);
  return user;
};

const authenticateKey = (req, res, next) => {
  let api_key = req.header("x-api-key");
  let account = users.find((user) => user.api_key === api_key);

  if (account) {
    let today = new Date().toISOString().split("T")[0];
    let usageCount = account.usage.findIndex((day) => day.date == today);

    if (usageCount >= 0) {
      if (account.usage[usageCount].count >= MAX) {
        res.status(429).send({
          error: {
            code: 429,
            message: "Max api calls exceeded",
          },
        });
      } else {
        account.usage[usageCount].count++;
        next();
      }
    } else {
      account.usage.push({ date: today, count: 1 });
      next();
    }
  } else {
    res.status(403).send({
      error: { code: 403, message: "You don't have the credentials" },
    });
  }
};

module.exports = { createUser, authenticateKey };
