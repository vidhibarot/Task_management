
import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { userTasksApi } from "../../api/tasks";
import { red, green } from "@mui/material/colors";
import moment from "moment"; // Import moment for time conversion

const Tasks = () => {
    const [myTasks, setMyTasks] = useState([]);

    // Fetch tasks by user
    const getAllTask = async () => {
        const response = await userTasksApi();
        console.log("response>>>", response);

        setMyTasks(response?.data?.data); // Assuming response has 'data' field with tasks grouped by project_id
    };

    useEffect(() => {
        getAllTask();
    }, []);

    // Function to convert time (in minutes) to hours, minutes, and seconds
    // const convertTime = (timeInMinutes) => {
    //     const duration = moment.duration(timeInMinutes, "minutes");
    //     return `${duration.hours()} hours ${duration.minutes()} minutes ${duration.seconds()} seconds`;
    // };
    const convertTime = (timeInMinutes) => {
        const duration = moment.duration(timeInMinutes, "minutes");
        const hours = duration.hours();
        const minutes = duration.minutes();

        let timeString = "";

        // Only add hours if non-zero
        if (hours > 0) {
            timeString += `${hours} hours `;
        }

        // Only add minutes if non-zero
        if (minutes > 0) {
            timeString += `${minutes} minutes `;
        }

        return timeString 
    };

    const getStatusColor = (status) => {
        return status === 1 ? red[500] : green[500]; // Red for pending (1), Green for completed (0)
    };

    return (
        <div style={{ width: "100%" }}>
            <Typography variant="h4" gutterBottom style={{ marginTop: "30px" }}>
                My Tasks
            </Typography>
            {myTasks.length === 0 ? (
                <Typography>No tasks found.</Typography>
            ) : (
                myTasks.map((projectGroup) => (
                    <TableContainer component={Paper} key={projectGroup._id} sx={{ marginBottom: 3, width: "100%" }}>
                        <Typography variant="h6" gutterBottom style={{ padding: "20px 0px 0px 20px" }}>
                            Project: {projectGroup.projectDetails.name}
                        </Typography>
                        <Table sx={{ width: '100%' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Task Duration</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projectGroup.tasks.map((task) => (
                                    <TableRow key={task._id}>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                sx={{
                                                    backgroundColor: getStatusColor(task.status),
                                                    '&:hover': {
                                                        backgroundColor: getStatusColor(task.status),
                                                    },
                                                }}
                                            >
                                                {task.status === 1 ? "Pending" : "Completed"}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            {task.time ? convertTime(task.time) : "Not decided"} {/* Display the formatted time */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ))
            )}
        </div>
    );
};

export default Tasks;

