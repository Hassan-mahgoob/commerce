import express from "express";
import { login, register } from "../services/userService.js";
const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const { data, statusCode } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    response.status(statusCode).send(data);
  } catch (error) {
    console.error("Failed to register user", error);
    response.status(500).send("Failed to register user");
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const { data, statusCode } = await login({ email, password });
    response.status(statusCode).send(data);
  } catch (error) {
    console.error("Failed to login user", error);
    response.status(500).send("Failed to login user");
  }
});

export default router;
