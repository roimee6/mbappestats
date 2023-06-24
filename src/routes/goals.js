const fs = require("fs");

server.get("/goals/:number", (request, response) => {
    const number = parseInt(request.params.number);
    const data = fs.readFileSync("./src/public/goals.csv", "utf8");

    if (number === 0) {
        response.send(data);
    } else {
        response.send(data.split("\n")[number - 1]);
    }
});