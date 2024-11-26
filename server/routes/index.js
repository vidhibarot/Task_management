module.exports = (app) => {
   
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to Demo project");
    });

    // app.use("/products", require("./products"));

    app.use("/users", require("./users"));

    app.use("/projects", require("./projects"));

    app.use("/task", require("./tasks"));
    // app.use("/role", require("./roles"));
}