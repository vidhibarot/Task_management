const express = require("express")
const router = express.Router()

const taskController = new (require('../controllers/tasks'))();
const Authentication = new (require("../middleware/authentication"));

const userAuth = Authentication.userAuth;

router.route("/addTask").post(userAuth, taskController.addTask);

router.route("/getAllTask").get(taskController.getAllTasks);

router.route("/getTaskByUser").get(userAuth,taskController.getTaskByUser);

router.route("/getTaskByProject").post(taskController.getTaskByProject);


module.exports = router
