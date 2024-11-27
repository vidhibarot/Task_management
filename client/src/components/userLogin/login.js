import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userLoginApi } from "../../api/users"; // Add your login API
import { useNavigate } from 'react-router';
import { useUserDispatch } from "../../redux/dispatch/userdispatch";

const UserLogin = () => {
  const navigate = useNavigate();
  const { setLoginData, setUserData, setModuleData } = useUserDispatch()
  // State for error and success messages
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      let response = await userLoginApi(values);
      console.log("Form Submitted with values: ", response);

      if (response?.status === 200) {
        setMessage("Login successful! Redirecting...");
        setMessageType("success");
        setLoginData(response?.data?.data?.usertoken);
        setUserData(response?.data?.data?.userData);
        // setTimeout(() => {
          navigate("/dashboard"); // Redirect to the dashboard or home page
        // }, 3000); // Redirect after 3 seconds
      } else {
        setMessage(response?.data?.message || "Login failed.");
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
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);  // Call your custom function here
    },
  });

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
          Login
        </Typography>

        {/* Display success or error message */}
        {message && (
          <Alert severity={messageType} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

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
          Login
        </Button>

        {/* Button to navigate to Register page */}
        <Button
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
        >
          Don't have an account? Register here
        </Button>
      </Box>
    </Container>
  );
};

export default UserLogin;
