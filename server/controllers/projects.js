const Projects = require("../model/projects");

class projectController {

    async addProject(req, res) {

        try {

            const findProject = await Projects.findOne({ 'name': req.body.name })

            if (findProject) {
                return res.status(400).send({ message: "Project name is there pls add other name" });
            }
            req.body.added_by = req?.userInfo[0]?._id;

            const result = await Projects.create(req.body);

            res.status(200).send({
                message: "Project has been added successfully",
                data: result
            });

        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Internal server Error pls check" });
        }
    }

    async getAllProjects(req, res) {
        try {
            const findProject = await Projects.aggregate(
                [
                    {
                        $lookup: {
                            from: "users",
                            localField: "added_by",
                            foreignField: "_id",
                            as: "users"

                        }
                    },
                    {
                        $unwind: {
                            path: "$users",
                        },
                    },
                ]
            );

            console.log("findprojectMMM", findProject)

            if (findProject?.length == 0) {
                return res.status(400).send({ message: "Projects Data are not there" });
            }

            res.status(200).send({
                message: "Request has been completed successfully..",
                data: findProject
            });

        } catch (error) {
            console.log(error);
            res.status(400).send({ message: "Internal server Error pls check" });

        }
    }

}

module.exports = projectController;


