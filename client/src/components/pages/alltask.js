
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";
import { getTaskByProject } from "../../api/tasks";
import { red, green } from "@mui/material/colors";
import moment from "moment";

const AllTasks = ({ id, onViewTasks }) => {
    const navigate = useNavigate();

    const [myTasks, setMyTasks] = useState([]);


    const getAllTask = async (projectId) => {
        try {
            const response = await getTaskByProject({ project_id: projectId });
            setMyTasks(response?.data?.data || []);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getAllTask(id);
        }
    }, [id]);


    const convertTime = (timeInMinutes) => {
        const duration = moment.duration(timeInMinutes, "minutes");
        const hours = duration.hours();
        const minutes = duration.minutes();

        let timeString = "";

        if (hours > 0) {
            timeString += `${hours} hours `;
        }

        if (minutes > 0) {
            timeString += `${minutes} minutes `;
        }

        return timeString;
    };

    const getStatusColor = (status) => {
        return status === 1 ? red[500] : green[500];
    };

    return (
        <div style={{ width: "100%" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4" gutterBottom style={{ marginTop: "30px" }}>
                    Project Task
                </Typography>
                <Button
                    variant="outlined"
                    onClick={() => onViewTasks("", false)}
                    style={{ marginBottom: "20px", marginTop: "40px" }}
                >
                    Back
                </Button>
            </div>

            {myTasks.length === 0 ? (
                <Typography>No tasks found.</Typography>
            ) : (
                <TableContainer component={Paper} sx={{ marginTop: 3, width: "100%" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Name</TableCell>
                                <TableCell>Project Name</TableCell>
                                <TableCell>Added By</TableCell>
                                <TableCell>Added For</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Task Duration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myTasks.map((task) => (
                                <TableRow key={task?._id}>
                                    <TableCell>{task?.name}</TableCell>
                                    <TableCell>{task?.projects?.name || "No project name"}</TableCell>
                                    <TableCell>{task?.addedByUser?.name}</TableCell>
                                    <TableCell>{task?.addedForUser?.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{
                                                backgroundColor: getStatusColor(task.status),
                                                "&:hover": {
                                                    backgroundColor: getStatusColor(task.status),
                                                },
                                            }}
                                        >
                                            {task.status === 1 ? "Pending" : "Completed"}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        {task.time ? convertTime(task.time) : "Not decided"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

        </div>
    );
};

export default AllTasks;



