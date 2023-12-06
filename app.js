const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const auth = require("./routes/auth")

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine" , "ejs");
app.set("views" , "views");

app.use("/auth" , auth)

app.listen(3000);
