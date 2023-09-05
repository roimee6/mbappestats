const fs = require("fs");

server.get("/goals/:number", (request, response) => {
    const number = parseInt(request.params.number);
    response.send(get(number));
});

module.exports.get = get;

function get(number) {
    const data = fs.readFileSync("./src/public/goals.csv", "utf8");

    if (number === 0) {
        return data;
    } else {
        const lines = data.split("\n");
        return lines[number - 1] + "," + lines.length;
    }
}