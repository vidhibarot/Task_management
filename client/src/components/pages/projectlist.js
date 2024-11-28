import { useState, React, useEffect } from 'react';
import {
    Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl, Typography
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';
import { Formik, Form, Field } from 'formik';
import { userListApi } from '../../api/users';
import { addTaskApi } from '../../api/tasks';
import * as Yup from 'yup';

const ProjectList = ({ onViewTasks, onAddTask, projectList }) => {
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [users, setUser] = useState([]);
    const [message, setMessage] = useState(''); 

    const getUser = async () => {
        const response = await userListApi();
        setUser(response?.data?.data || []);
    };

    useEffect(() => {
        getUser();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Task Name is required'),
        time: Yup.number()
            .required('Time is required')
            .positive('Time must be a positive number')
            .integer('Time must be an integer'),
        added_for: Yup.string().required('Please select a user'),
    });

    const handleViewTasks = (projectId) => {
        onViewTasks(projectId,true);
    };

    const handleAddTask = (projectId) => {
        setMessage("")
        setSelectedProjectId(projectId);
        setOpenAddTaskForm(true);
    };

    const handleCloseForm = () => {
        setMessage("")
        setOpenAddTaskForm(false);
        setSelectedProjectId(null);
        setMessage(''); 
    };

    
    const handleSaveTask = async (values, resetForm) => {
        setMessage(''); 

        const taskData = {
            project_id: selectedProjectId,
            name: values.name,
            time: values.time,
            added_for: values.added_for,
        };

        try {
            const response = await addTaskApi(taskData);

            if (response?.status === 200) {
                setMessage(response?.data?.message || 'Task added successfully'); 
                // onAddTask(taskData); 
                setOpenAddTaskForm(false);
                resetForm()
                
            } else {
                setMessage(response?.data?.message || 'Failed to add task. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred while adding the task. Please try again.');
        }
       
    };
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Added By</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>View Tasks</TableCell>
                            <TableCell>Add Task</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projectList?.map((project) => (
                            <TableRow key={project?._id}>
                                <TableCell>{project?.name}</TableCell>
                                <TableCell>{project?.users?.name}</TableCell>
                                <TableCell>
                                    {project?.status === 1 ? (
                                        <Button variant="contained" color="error" size="small">
                                            Pending
                                        </Button>
                                    ) : (
                                        <Button variant="contained" color="success" size="small">
                                            Complete
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<TaskAltIcon />}
                                        onClick={() => handleViewTasks(project?._id)}
                                    >
                                        View Tasks
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                        onClick={() => handleAddTask(project?._id)}
                                    >
                                        Add Task
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openAddTaskForm} onClose={handleCloseForm}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    {message && (
                        <Typography
                            variant="body2"
                            color={message.includes('successfully') ? 'green' : 'red'}
                            style={{ marginBottom: '1rem' }}
                        >
                            {message}
                        </Typography>
                    )}
                    <Formik
                        initialValues={{
                            name: '',
                            time: '',
                            added_for: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            handleSaveTask(values, resetForm); 
                        }}
                   
                    >
                        {({ values, setFieldValue, errors, touched }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="name"
                                    label="Task Name"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                                <Field
                                    as={TextField}
                                    name="time"
                                    label="Time (in hours)"
                                    fullWidth
                                    variant="outlined"
                                    margin="dense"
                                    type="number"
                                    error={touched.time && Boolean(errors.time)}
                                    helperText={touched.time && errors.time}
                                />
                                <FormControl
                                    fullWidth
                                    margin="dense"
                                    error={touched.added_for && Boolean(errors.added_for)}
                                >
                                    <InputLabel>Username</InputLabel>
                                    <Select
                                        value={values.added_for || ''}
                                        onChange={(event) => setFieldValue('added_for', event.target.value)}
                                    >
                                        {users?.map((user) => (
                                            <MenuItem key={user._id} value={user._id}>
                                                {user.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.added_for && errors.added_for && (
                                        <Typography color="error" variant="body2">
                                            {errors.added_for}
                                        </Typography>
                                    )}
                                </FormControl>
                                <DialogActions>
                                    <Button onClick={handleCloseForm} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary">
                                        Save Task
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ProjectList;

