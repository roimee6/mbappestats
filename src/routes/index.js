server.get("/", (_, response) => {
    response.render("index");
});