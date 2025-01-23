import React, { useState } from "react";
import { useLoginMutation } from "../services/api";
import { setTokens, setUser } from "../store/reducers/authReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../store/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRequest, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginRequest({ email, password }).unwrap();

      dispatch(
        setTokens({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      );

      dispatch(
        setUser({
          name: data.data.user.name,
          email: data.data.user.email,
          role: data.data.user.role,
        })
      );
      toast.success("Login Successful");
    } catch (err) {
      console.error(err);
      toast.error("Login Failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "100px auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Logging In..." : "Login"}
        </Button>
      </form>
      {error && (
        <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
          error
        </Typography>
      )}
    </Box>
  );
};

export default Login;
