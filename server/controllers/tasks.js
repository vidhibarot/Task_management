const Tasks = require("../model/tasks");

class taskController {

    async addTask(req, res) {

        try {

            req.body.added_by = req?.userInfo[0]?._id;

            const result = await Tasks.create(req.body);

            res.status(200).send({
                message: "Task has been added successfully",
                data: result
            });

        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Internal server Error pls check" });

        }
    }

    async getAllTasks(req, res) {
        try {

            const findTaskData = await Tasks.aggregate(
                [
                    {
                        $lookup: {
                            from: "users",
                            localField: "added_by",
                            foreignField: "_id",
                            as: "addedByUser"

                        }
                    },

                    {
                        $lookup: {
                            from: "users",
                            localField: "added_for",
                            foreignField: "_id",
                            as: "addedForUser"

                        }
                    },
                    {
                        $lookup: {
                            from: "projects",
                            localField: "project_id",
                            foreignField: "_id",
                            as: "projects"

                        }
                    },
                    {
                        $unwind: {
                            path: "$addedByUser",
                        },
                    },
                    {
                        $unwind: {
                            path: "$addedForUser",
                        },
                    },
                    {
                        $unwind: {
                            path: "$projects",
                        },
                    },
                ]
            );

            if (findTaskData?.length == 0) {
                return res.status(400).send({ message: "Tasks Data are not there" });
            }

            res.status(200).send({
                message: "Request has been completed successfully..",
                data: findTaskData
            });

        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Internal server Error pls check" });

        }
    }

    async getTaskByUser(req, res) {
        try {
            req?.userInfo[0]?._id;
            const userTasks = await Tasks.find({ project_id: req?.body?.project_id, added_for: req?.userInfo[0]?._id })

            if (userTasks?.length == 0) {
                return res.status(400).send({ message: "Tasks Data are not there" });
            }
            res.status(200).send({
                message: "Request has been completed successfully..",
                data: userTasks
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Internal server Error pls check" });
        }
    }

    async getTaskByProject(req, res) {
        try {
            const userTasks = await Tasks.find({ project_id: req?.body?.project_id })

            if (userTasks?.length == 0) {
                return res.status(400).send({ message: "Tasks Data are not there" });
            }
            res.status(200).send({
                message: "Request has been completed successfully..",
                data: userTasks
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Internal server Error pls check" });
        }
    }

}

module.exports = taskController;


