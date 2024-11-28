
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Modal, TextField, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProjectList from './projectlist';
import AllTasks from './alltask';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AddProjectsApi } from '../../api/projects';
import { getAllProjectsApi } from '../../api/projects';

const Projects = () => {
    const [openCreateProjectForm, setOpenCreateProjectForm] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);
    const [openViewTaskForm, setOpenViewTaskForm] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const projectValidationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Project name must be at least 3 characters')
            .required('Project name is required'),
    });

    const getAllProjects = async () => {
        const response = await getAllProjectsApi();
        setProjectList(response?.data?.data || []);
    };

    useEffect(() => {
        getAllProjects();
    }, []);


    const handleViewTasks = (projectId, value) => {
        setCurrentProjectId(projectId);
        setOpenViewTaskForm(value);
    };

    const handleAddProject = async (values, resetForm) => {
        setErrorMessage('');

        try {
            const response = await AddProjectsApi(values);

            if (response.status === 200) {
                setOpenCreateProjectForm(false);
                resetForm();
                getAllProjects();

            } else {
                setErrorMessage(response.data?.message || 'An error occurred while creating the project.');

            }
        } catch (error) {
            setErrorMessage('Error adding project: ' + error.message);

        }
    };

    return (
        <Box style={{ width: "100%" }}>
            {!openViewTaskForm ? (
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Projects List
                    </Typography>

                    {/* Button to open the form for creating a new project */}
                    <Box sx={{ marginBottom: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenCreateProjectForm(true)}
                            startIcon={<AddIcon />}
                        >
                            Create Project
                        </Button>
                    </Box>

                    {/* Call the ProjectList component here */}
                    <ProjectList onViewTasks={handleViewTasks} projectList={projectList} />

                    {/* Modal form for creating a new project */}
                    <Modal
                        open={openCreateProjectForm}
                        onClose={() => setOpenCreateProjectForm(false)}
                        aria-labelledby="create-project-modal"
                        aria-describedby="create-new-project"
                    >
                        <Box sx={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 24, width: 300
                        }}>
                            <Typography variant="h6" gutterBottom>
                                Create New Project
                            </Typography>


                            {errorMessage && (
                                <Alert severity="error" sx={{ marginBottom: 2 }}>
                                    {errorMessage}
                                </Alert>
                            )}

                            {/* Formik Form */}
                            <Formik
                                initialValues={{ name: '' }}
                                validationSchema={projectValidationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    handleAddProject(values, resetForm);
                                }}
                            >
                                {({ touched, errors, handleChange, handleBlur, values, resetForm }) => (
                                    <Form>
                                        <Box sx={{ marginBottom: 2 }}>
                                            {/* Project Name Input */}
                                            <TextField
                                                fullWidth
                                                name="name"
                                                label="Project Name"
                                                variant="outlined"
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                            >
                                                Create
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => setOpenCreateProjectForm(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Modal>
                </Box>
            ) : (
                <Box>
                    <AllTasks id={currentProjectId} onViewTasks={handleViewTasks}></AllTasks>
                </Box>
            )}
        </Box>
    );
};

export default Projects;



