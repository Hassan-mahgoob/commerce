import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { login } = useAuth();
  const handleSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email, password);

    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    // Make the call to API to create the user
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      setError("Unable to login user, Please try different credentials");

      return;
    }

    const token = await response.json();
    if (!token) {
      setError("Incorrect token");
      return;
    }
    login(email, token);
    navigate("/");
    console.log(token);

    emailRef.current!.value = "";
    passwordRef.current!.value = "";
  };
  return (
    <Container>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography variant="h4">Login</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            border: "1px solid #ccc",
            borderRadius: "5px",
            p: 2,
            mt: 2,
          }}
        >
          <TextField
            label="email"
            variant="outlined"
            fullWidth
            margin="normal"
            inputRef={emailRef}
          />
          <TextField
            label="password"
            variant="outlined"
            fullWidth
            margin="normal"
            inputRef={passwordRef}
          />

          {error && (
            <Typography
              sx={{ mt: 2, alignItems: "center" }}
              variant="body1"
              color="error"
            >
              {error}
            </Typography>
          )}

          {error && (
            <Typography
              sx={{ mt: 2, alignItems: "center" }}
              variant="body1"
              color="error"
            >
              {error}
            </Typography>
          )}

          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              mt: 2,
              fontWeight: "bold",
              fontSize: "1.3rem",
              fontFamily: "monospace",
            }}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
