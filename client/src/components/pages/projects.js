// // import * as React from 'react';
// // import { Button, Box, Typography, List, ListItem, ListItemText, Divider, Modal, TextField } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import TaskAltIcon from '@mui/icons-material/TaskAlt';
// // import ProjectList from './projectlist';
// // const Projects = () => {
// //     // State to store projects
// //     const [projects, setProjects] = React.useState([]);
// //     const [newProjectName, setNewProjectName] = React.useState('');
// //     const [newTaskName, setNewTaskName] = React.useState('');
// //     const [openCreateProjectForm, setOpenCreateProjectForm] = React.useState(false);
// //     const [openAddTaskForm, setOpenAddTaskForm] = React.useState(false);
// //     const [currentProjectId, setCurrentProjectId] = React.useState(null);

// //     // Add a new project
// //     const addProject = () => {
// //         if (newProjectName.trim() !== '') {
// //             setProjects([
// //                 ...projects,
// //                 { id: Date.now(), name: newProjectName, tasks: [] },
// //             ]);
// //             setNewProjectName('');
// //             setOpenCreateProjectForm(false); // Close the form after creating the project
// //         }
// //     };

// //     // Add a task to a specific project
// //     const addTaskToProject = () => {
// //         if (newTaskName.trim() !== '') {
// //             setProjects(projects.map(project =>
// //                 project.id === currentProjectId
// //                     ? { ...project, tasks: [...project.tasks, newTaskName] }
// //                     : project
// //             ));
// //             setNewTaskName('');
// //             setOpenAddTaskForm(false); // Close the task form after adding the task
// //         }
// //     };

// //     return (
// //         <Box sx={{ p: 3 }}>

// //             {/* Button to open the form for creating a new project */}
// //             <Box sx={{ marginBottom: 2 }}>
// //                 <Box>
// //                     <Button
// //                         variant="contained"
// //                         color="primary"
// //                         onClick={() => setOpenCreateProjectForm(true)}
// //                         startIcon={<AddIcon />}
// //                     >
// //                         Create Project
// //                     </Button>
// //                 </Box>

// //             </Box>

// //             {/* Modal form for creating a new project */}
// //             <Modal
// //                 open={openCreateProjectForm}
// //                 onClose={() => setOpenCreateProjectForm(false)}
// //                 aria-labelledby="create-project-modal"
// //                 aria-describedby="create-new-project"
// //             >
// //                 <Box sx={{
// //                     position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
// //                     backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 24, width: 300
// //                 }}>
// //                     <Typography variant="h6" gutterBottom>
// //                         Create New Project
// //                     </Typography>
// //                     <TextField
// //                         fullWidth
// //                         label="Project Name"
// //                         variant="outlined"
// //                         value={newProjectName}
// //                         onChange={(e) => setNewProjectName(e.target.value)}
// //                         sx={{ marginBottom: 2 }}
// //                     />
// //                     <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// //                         <Button variant="contained" color="primary" onClick={addProject}>
// //                             Create
// //                         </Button>
// //                         <Button variant="outlined" color="secondary" onClick={() => setOpenCreateProjectForm(false)}>
// //                             Cancel
// //                         </Button>
// //                     </Box>
// //                 </Box>
// //             </Modal>

// //             {/* List of projects */}
          

// //             <ProjectList />

// //             {/* Divider to separate sections */}
// //             {/* <Divider sx={{ marginTop: 3 }} /> */}

// //             {/* Modal form for adding a task */}
// //             <Modal
// //                 open={openAddTaskForm}
// //                 onClose={() => setOpenAddTaskForm(false)}
// //                 aria-labelledby="add-task-modal"
// //                 aria-describedby="add-new-task"
// //             >
// //                 <Box sx={{
// //                     position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
// //                     backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 24, width: 300
// //                 }}>
// //                     <Typography variant="h6" gutterBottom>
// //                         Add New Task
// //                     </Typography>
// //                     <TextField
// //                         fullWidth
// //                         label="Task Name"
// //                         variant="outlined"
// //                         value={newTaskName}
// //                         onChange={(e) => setNewTaskName(e.target.value)}
// //                         sx={{ marginBottom: 2 }}
// //                     />
// //                     <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// //                         <Button variant="contained" color="primary" onClick={addTaskToProject}>
// //                             Add Task
// //                         </Button>
// //                         <Button variant="outlined" color="secondary" onClick={() => setOpenAddTaskForm(false)}>
// //                             Cancel
// //                         </Button>
// //                     </Box>
// //                 </Box>
// //             </Modal>
// //         </Box>
// //     );
// // };

// // export default Projects;
// import * as React from 'react';
// import { Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, TextField, Paper } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import TaskAltIcon from '@mui/icons-material/TaskAlt';

// const Projects = () => {
//   // State to store projects
//   const [projects, setProjects] = React.useState([
//     { id: 1, name: 'Project 1', status: 'Pending', tasks: ['Task 1', 'Task 2'] },
//     { id: 2, name: 'Project 2', status: 'Completed', tasks: ['Task 1'] },
//     { id: 3, name: 'Project 3', status: 'Pending', tasks: ['Task 1', 'Task 2', 'Task 3'] },
//   ]);
//   const [newProjectName, setNewProjectName] = React.useState('');
//   const [newTaskName, setNewTaskName] = React.useState('');
//   const [openCreateProjectForm, setOpenCreateProjectForm] = React.useState(false);
//   const [openAddTaskForm, setOpenAddTaskForm] = React.useState(false);
//   const [currentProjectId, setCurrentProjectId] = React.useState(null);

//   // Add a new project
//   const addProject = () => {
//     if (newProjectName.trim() !== '') {
//       setProjects([
//         ...projects,
//         { id: Date.now(), name: newProjectName, status: 'Pending', tasks: [] },
//       ]);
//       setNewProjectName('');
//       setOpenCreateProjectForm(false); // Close the form after creating the project
//     }
//   };

//   // Add a task to a specific project
//   const addTaskToProject = () => {
//     if (newTaskName.trim() !== '') {
//       setProjects(projects.map(project =>
//         project.id === currentProjectId
//           ? { ...project, tasks: [...project.tasks, newTaskName] }
//           : project
//       ));
//       setNewTaskName('');
//       setOpenAddTaskForm(false); // Close the task form after adding the task
//     }
//   };

//   // Function to handle changing the status color
//   const getStatusColor = (status) => {
//     if (status === 'Pending') return 'red';
//     if (status === 'Completed') return 'green';
//     return 'black'; // Default color
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         Projects List
//       </Typography>

//       {/* Button to open the form for creating a new project */}
//       <Box sx={{ marginBottom: 2 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setOpenCreateProjectForm(true)}
//           startIcon={<AddIcon />}
//         >
//           Create Project
//         </Button>
//       </Box>

//       {/* Table for project list */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Project Name</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>View Tasks</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {projects.map((project) => (
//               <TableRow key={project.id} sx={{ backgroundColor: getStatusColor(project.status), '&:hover': { backgroundColor: '#f5f5f5' } }}>
//                 <TableCell>{project.name}</TableCell>
//                 <TableCell>{project.status}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => {
//                       setCurrentProjectId(project.id);
//                       setOpenAddTaskForm(true);
//                     }}
//                   >
//                     View Tasks
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Modal form for creating a new project */}
//       <Modal
//         open={openCreateProjectForm}
//         onClose={() => setOpenCreateProjectForm(false)}
//         aria-labelledby="create-project-modal"
//         aria-describedby="create-new-project"
//       >
//         <Box sx={{
//           position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//           backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 24, width: 300
//         }}>
//           <Typography variant="h6" gutterBottom>
//             Create New Project
//           </Typography>
//           <TextField
//             fullWidth
//             label="Project Name"
//             variant="outlined"
//             value={newProjectName}
//             onChange={(e) => setNewProjectName(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button variant="contained" color="primary" onClick={addProject}>
//               Create
//             </Button>
//             <Button variant="outlined" color="secondary" onClick={() => setOpenCreateProjectForm(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Modal form for adding a task */}
//       <Modal
//         open={openAddTaskForm}
//         onClose={() => setOpenAddTaskForm(false)}
//         aria-labelledby="add-task-modal"
//         aria-describedby="add-new-task"
//       >
//         <Box sx={{
//           position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
//           backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 24, width: 300
//         }}>
//           <Typography variant="h6" gutterBottom>
//             Add New Task
//           </Typography>
//           <TextField
//             fullWidth
//             label="Task Name"
//             variant="outlined"
//             value={newTaskName}
//             onChange={(e) => setNewTaskName(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button variant="contained" color="primary" onClick={addTaskToProject}>
//               Add Task
//             </Button>
//             <Button variant="outlined" color="secondary" onClick={() => setOpenAddTaskForm(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Projects;
import * as React from 'react';
import { Button, Box, Typography, Modal, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProjectList from './projectlist'; // Import the ProjectList component

const Projects = () => {
  // State to store projects
  const [projects, setProjects] = React.useState([
    { id: 1, name: 'Project 1', status: 'Pending', tasks: ['Task 1', 'Task 2'] },
    { id: 2, name: 'Project 2', status: 'Completed', tasks: ['Task 1'] },
    { id: 3, name: 'Project 3', status: 'Pending', tasks: ['Task 1', 'Task 2', 'Task 3'] },
  ]);
  const [newProjectName, setNewProjectName] = React.useState('');
  const [newTaskName, setNewTaskName] = React.useState('');
  const [openCreateProjectForm, setOpenCreateProjectForm] = React.useState(false);
  const [openAddTaskForm, setOpenAddTaskForm] = React.useState(false);
  const [currentProjectId, setCurrentProjectId] = React.useState(null);

  // Add a new project
  const addProject = () => {
    if (newProjectName.trim() !== '') {
      setProjects([
        ...projects,
        { id: Date.now(), name: newProjectName, status: 'Pending', tasks: [] },
      ]);
      setNewProjectName('');
      setOpenCreateProjectForm(false); // Close the form after creating the project
    }
  };

  // Add a task to a specific project
  const addTaskToProject = () => {
    if (newTaskName.trim() !== '') {
      setProjects(projects.map(project =>
        project.id === currentProjectId
          ? { ...project, tasks: [...project.tasks, newTaskName] }
          : project
      ));
      setNewTaskName('');
      setOpenAddTaskForm(false); // Close the task form after adding the task
    }
  };

  // Handle opening the Add Task modal
  const handleViewTasks = (projectId) => {
    setCurrentProjectId(projectId); // Set the project for which tasks are being added
    setOpenAddTaskForm(true); // Open the Add Task modal
  };

  return (
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
      <ProjectList projects={projects} onViewTasks={handleViewTasks} />

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
          <TextField
            fullWidth
            label="Project Name"
            variant="outlined"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={addProject}>
              Create
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setOpenCreateProjectForm(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal form for adding a task */}
      {/* <Modal
        open={openAddTaskForm}
        onClose={() => setOpenAddTaskForm(false)}
        aria-labelledby="add-task-modal"
        aria-describedby="add-new-task"
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: 3, borderRadius: 2, boxShadow: 24, width: 300
        }}>
          <Typography variant="h6" gutterBottom>
            Add New Task
          </Typography>
          <TextField
            fullWidth
            label="Task Name"
            variant="outlined"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={addTaskToProject}>
              Add Task
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setOpenAddTaskForm(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal> */}
    </Box>
  );
};

export default Projects;

