module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to  project");
    });

    app.use("/users", require("./users"));

    app.use("/projects", require("./projects"));

    app.use("/task", require("./tasks"));
}