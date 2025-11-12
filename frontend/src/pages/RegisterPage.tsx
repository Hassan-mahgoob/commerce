import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";
const RegisterPage = () => {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();
  const handleSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(firstName, lastName, email, password);

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }
    // Make the call to API to create the user
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    if (!response.ok) {
      setError("Unable to register user, Please try different credentials");

      return;
    }

    const token = await response.json();
    if (!token) {
      setError("Incorrect token");
      return;
    }
    login(email, token);
    console.log(token);

    firstNameRef.current!.value = "";
    lastNameRef.current!.value = "";
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
        <Typography variant="h4">Register New Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "60%",
            border: "1px solid #ccc",
            borderRadius: "5px",
            p: 2,
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <TextField
              label="first name"
              variant="outlined"
              fullWidth
              margin="normal"
              inputRef={firstNameRef}
            />
            <TextField
              label="last name"
              variant="outlined"
              fullWidth
              margin="normal"
              inputRef={lastNameRef}
            />
          </Box>
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
            type="password"
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
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
