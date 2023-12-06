const { createUser, findUser } = require("../model/user");
const bcrypt = require("bcrypt");

exports.createUser = async (email, password) => {
  try {
    const resp = await createUser(email, password);
    return resp;
  } catch (err) {
    throw err;
  }
};

exports.login = async (email, password) => {
  try {
    const user = await findUser(email);
    const result = bcrypt.compare(password, !!user && user.password);
    console.log(result);
    if (result) {
      return "Login Successfully";
    }
    return "Incorrect Email Id or Pass";
  } catch (err) {
    throw err;
  }
};
