const express = require("express");
const fs = require("fs");

global.server = express();

server.use(express.static(__dirname + "/public"));

server.use(require("morgan")("dev"));
server.set("views", __dirname + "/views");
server.set("view engine", "ejs");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

fs.readdirSync(__dirname + "/routes/").forEach(fileName => require("./routes/" + fileName));

server.get("*", (_, response) => {
    response.render("error");
    response.status(404);
});

server.listen(3000);
