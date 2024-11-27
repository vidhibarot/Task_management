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

    // async getTaskByUser(req, res) {
    //     try {
    //         req?.userInfo[0]?._id;
    //         const userTasks = await Tasks.find({ project_id: req?.body?.project_id, added_for: req?.userInfo[0]?._id })

    //         if (userTasks?.length == 0) {
    //             return res.status(400).send({ message: "Tasks Data are not there" });
    //         }
    //         res.status(200).send({
    //             message: "Request has been completed successfully..",
    //             data: userTasks
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).send({ message: "Internal server Error pls check" });
    //     }
    // }
    // async getTaskByUser(req, res) {
    //     try {
    //         console.log("get Task By Userre>>")
    //         const userId = req?.userInfo[0]?._id;

    //         if (!userId) {
    //             return res.status(400).send({ message: "User not found or invalid." });
    //         }

    //         const userTasks = await Tasks.aggregate([
    //             {
    //                 $match: {
    //                     added_for: userId
    //                 }
    //             },
    //             {
    //                 $group: {
    //                     _id: "$project_id",  // Group tasks by project_id
    //                     tasks: { $push: "$$ROOT" }  // Push all task documents into an array under "tasks"
    //                 }
    //             },
    //             {
    //                 $sort: { _id: 1 }  // Sort the grouped results by project_id (ascending order)
    //             }
    //         ]);
    //         console.log("USer Tasks Re therere>>", userTasks)

    //         if (userTasks?.length === 0) {
    //             return res.status(400).send({ message: "No tasks found for this user in the given project." });
    //         }

    //         res.status(200).send({
    //             message: "Request has been completed successfully.",
    //             data: userTasks
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(400).send({ message: "Internal server error. Please check." });
    //     }
    // }
    async getTaskByUser(req, res) {
        try {
            const userId = req?.userInfo[0]?._id;
    
            if (!userId) {
                return res.status(400).send({ message: "User not found or invalid." });
            }
    
            // Aggregation pipeline to group tasks by project_id and get related project and user details
            const userTasks = await Tasks.aggregate([
                // Step 1: Match tasks by project_id and added_for (userId)
                {
                    $match: {
                        added_for: userId
                    }
                },
                // Step 2: Group tasks by project_id
                {
                    $group: {
                        _id: "$project_id",  // Group by project_id
                        tasks: { $push: "$$ROOT" }  // Push the entire task document into the "tasks" array
                    }
                },
                // Step 3: Sort by project_id in ascending order
                {
                    $sort: { _id: 1 }
                },
                // Step 4: Lookup to get project details
                {
                    $lookup: {
                        from: "projects",  // Name of the projects collection
                        localField: "_id",  // Reference to project_id from tasks
                        foreignField: "_id", // Match with the _id field in projects collection
                        as: "projectDetails" // Alias for the lookup result
                    }
                },
                // Step 5: Lookup to get user details for the 'added_by' field
                {
                    $lookup: {
                        from: "users",  // Name of the users collection
                        localField: "tasks.added_by_user",  // Field in tasks representing user who added the task
                        foreignField: "_id", // Match with the _id field in users collection
                        as: "addedByUserDetails" // Alias for the lookup result
                    }
                },
                // Step 6: Optionally unwind the "projectDetails" and "addedByUserDetails" arrays
                {
                    $unwind: {
                        path: "$projectDetails",  // Unwind project details array
                        preserveNullAndEmptyArrays: true  // Keep the project if no match is found
                    }
                },
                {
                    $unwind: {
                        path: "$addedByUserDetails",  // Unwind addedByUserDetails array
                        preserveNullAndEmptyArrays: true  // Keep the user if no match is found
                    }
                }
            ]);
    
            // Check if no tasks were found
            if (userTasks?.length === 0) {
                return res.status(400).send({ message: "No tasks found for this user in the given project." });
            }
    
            // Send the grouped and enriched tasks data with project and user info
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


