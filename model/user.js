const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');

const jsonPath = path.join(process.cwd(), "data", "users.json");

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonPath, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
};

const writeData = (data) => {
  return new Promise((resolve, reject) => {
    9 *
      fs.writeFile(jsonPath, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
  });
};

exports.createUser = async (email, password) => {
  try {
    const users = await readData();

    const matched = users.find((u) => u.email === email);

    if (matched) {
      throw new Error("User Already Exist!");
    } else {
      const hashPass = await bcrypt.hash(password , 12);
      await writeData([...users, { email, hashPass, userId: uuidv4() }]);
      return "Successfully created";
    }
  } catch (err) {
    throw err;
  }
};

exports.findUser = async (email) => {
  try {
    const users = await readData();

    const matched = users.find((u) => u.email === email);

    return matched;
  } catch (err) {
    throw err;
  }
};