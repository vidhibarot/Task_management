

// export default ProjectList;
import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';

const ProjectList = ({ projects, onViewTasks, onAddTask }) => {
    // Function to handle task view
    const handleAddTasks = (projectId) => {
        onViewTasks(projectId);
    };

    // Function to handle adding task
    const handleAddTask = (projectId) => {
        onAddTask(projectId);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>View Tasks</TableCell>
                        <TableCell>Add Task</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>{project.name}</TableCell>
                            <TableCell>{project.status}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<TaskAltIcon />}
                                //   onClick={() => handleViewTasks(project.id)}
                                >
                                    View Tasks
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={() => handleAddTasks(project.id)}
                                >
                                    Add Task
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectList;

