
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Alert,  // Material-UI alert for displaying messages
// } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { userRegisterApi } from "../../api/users";
// import { useNavigate } from 'react-router';

// const UserRegister = () => {
//   const navigate = useNavigate();

//   // State for error and success messages
//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState("success");

//   // Validation schema
//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .min(3, "Name must be at least 3 characters")
//       .required("Name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   });

//   const handleSubmit = async (values) => {
//     try {
//       let response = await userRegisterApi(values);
//       console.log("Form Submitted with values: ", response);

//       if (response?.status === 200) {
//         setMessage("Registration successful! Redirecting to login...");
//         setMessageType("success");

//         navigate("/login");

//       } else {
//         setMessage(response?.data?.message || "Registration failed.");
//         setMessageType("error");
//       }
//     } catch (error) {
//       setMessage("An error occurred. Please try again.");
//       setMessageType("error");
//     }
//   };

//   // Formik configuration
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       handleSubmit(values);  // Call your custom function here
//     },
//   });

//   return (
//     <Container maxWidth="sm">
//       <Box
//         component="form"
//         onSubmit={formik.handleSubmit}
//         mt={4}
//         p={3}
//         sx={{
//           boxShadow: 3,
//           borderRadius: 2,
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         <Typography variant="h4" gutterBottom textAlign="center">
//           Register
//         </Typography>

//         {/* Display success or error message */}
//         {message && (
//           <Alert severity={messageType} sx={{ mb: 2 }}>
//             {message}
//           </Alert>
//         )}

//         <TextField
//           fullWidth
//           id="name"
//           name="name"
//           label="Name"
//           variant="outlined"
//           margin="normal"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.name && Boolean(formik.errors.name)}
//           helperText={formik.touched.name && formik.errors.name}
//         />
//         <TextField
//           fullWidth
//           id="email"
//           name="email"
//           label="Email"
//           variant="outlined"
//           margin="normal"
//           type="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//         <TextField
//           fullWidth
//           id="password"
//           name="password"
//           label="Password"
//           variant="outlined"
//           margin="normal"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Register
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default UserRegister;
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,  // Material-UI alert for displaying messages
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userRegisterApi } from "../../api/users";
import { useNavigate } from 'react-router';

const UserRegister = () => {
  const navigate = useNavigate();

  // State for error and success messages
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      let response = await userRegisterApi(values);
      console.log("Form Submitted with values: ", response);

      if (response?.status === 200) {
        setMessage("Registration successful! Redirecting to login...");
        setMessageType("success");

        // setTimeout(() => {
          navigate("/login");
        // }, 3000); // Redirect after 3 seconds
      } else {
        setMessage(response?.data?.message || "Registration failed.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    }
  };

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);  // Call your custom function here
    },
  });

  // Navigate to login page when button is clicked
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        mt={4}
        p={3}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="center">
          Register
        </Typography>

        {/* Display success or error message */}
        {message && (
          <Alert severity={messageType} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>

        {/* Button to navigate to login page */}
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={navigateToLogin}
        >
          Already have an account? Login here
        </Button>
      </Box>
    </Container>
  );
};

export default UserRegister;


