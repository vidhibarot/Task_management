module.exports = (app) => {
    console.log("bacjend ma cvevvvvchhehehehhehe")
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to  project");
    });

    // app.use("/products", require("./products"));

    app.use("/users", require("./users"));

    app.use("/projects", require("./projects"));

    app.use("/task", require("./tasks"));
    // app.use("/role", require("./roles"));
}