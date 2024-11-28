const express = require("express")
const router = express.Router()

const projectController = new (require('../controllers/projects'))();
const Authentication = new (require("../middleware/authentication"));

const userAuth = Authentication.userAuth;

router.route("/addProject").post(userAuth, projectController.addProject);

router.route("/getAllprojects").get(projectController.getAllProjects);




module.exports = router
