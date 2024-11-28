const Tasks = require("../model/tasks");
const mongoose = require("mongoose");

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
            const userId = req?.userInfo[0]?._id;

            if (!userId) {
                return res.status(400).send({ message: "User not found or invalid." });
            }

          
            const userTasks = await Tasks.aggregate([
               
                {
                    $match: {
                        added_for: userId
                    }
                },
               
                {
                    $group: {
                        _id: "$project_id",  
                        tasks: { $push: "$$ROOT" }  
                    }
                },
                
                {
                    $sort: { _id: 1 }
                },
                
                {
                    $lookup: {
                        from: "projects",  
                        localField: "_id",  
                        foreignField: "_id", 
                        as: "projectDetails" 
                    }
                },
               
                {
                    $lookup: {
                        from: "users", 
                        localField: "tasks.added_by_user",  
                        foreignField: "_id", 
                        as: "addedByUserDetails" 
                    }
                },
               
                {
                    $unwind: {
                        path: "$projectDetails",  
                        preserveNullAndEmptyArrays: true 
                    }
                },
                {
                    $unwind: {
                        path: "$addedByUserDetails", 
                        preserveNullAndEmptyArrays: true  
                    }
                }
            ]);

            
            if (userTasks?.length === 0) {
                return res.status(400).send({ message: "No tasks found for this user in the given project." });
            }

           
            res.status(200).send({
                message: "Request has been completed successfully.",
                data: userTasks
            });
        } catch (error) {
            console.error(error);
            res.status(400).send({ message: "Internal server error. Please check." });
        }
    }


    async getTaskByProject(req, res) {
        try {
            const userTasks = await Tasks.aggregate([
                {
                    $match: {
                        project_id: new mongoose.Types.ObjectId(req.body.project_id), 
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "added_by",
                        foreignField: "_id",
                        as: "addedByUser",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "added_for",
                        foreignField: "_id",
                        as: "addedForUser",
                    },
                },
                {
                    $lookup: {
                        from: "projects",
                        localField: "project_id",
                        foreignField: "_id",
                        as: "projects",
                    },
                },
                {
                    $unwind: {
                        path: "$addedByUser",
                        preserveNullAndEmptyArrays: true, 
                    },
                },
                {
                    $unwind: {
                        path: "$addedForUser",
                        preserveNullAndEmptyArrays: true, 
                    },
                },
                {
                    $unwind: {
                        path: "$projects",
                        preserveNullAndEmptyArrays: true, 
                    },
                },
            ]);


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


