const jwt = require("jsonwebtoken");
const { createUser, findUser } = require("../model/user");
const bcrypt = require("bcrypt");
const { SECRET_KEY } = require("../data/key");

exports.createUser = async (email, password) => {
  try {
    const hashPass = await bcrypt.hash(password, 12);
    const resp = await createUser(email, hashPass);
    return resp;
  } catch (err) {
    throw err;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await findUser(email);
    console.log(user);
    const result = await bcrypt.compare(password, user.password);
    console.log(result);
    if (!!user && result) {
      var token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
      return {token};
    }
    return "Incorrect Email Id or Pass";
  } catch (err) {
    throw err;
  }
};
