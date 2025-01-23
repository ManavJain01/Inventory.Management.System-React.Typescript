import React, { useState } from "react";
import { useSignUpMutation } from "../services/api";
import { useDispatch } from "react-redux";
import {
  setTokens,
  resetTokens,
  setLoading,
} from "../store/reducers/authReducer";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Default role is USER
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const dispatch = useDispatch();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signUp({ name, email, password, role }).unwrap();
      console.log("data in signup:", data);

      // Dispatch actions if necessary (e.g., saving token)
      // dispatch(login(data.token));
      alert("Sign Up Successful");
    } catch (err) {
      console.error(err);
      alert("Sign Up Failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "50px auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
            required
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="MANAGER">MANAGER</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ marginTop: "16px" }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
      </form>
      {error && (
        <Typography color="error" variant="body2">
          error
        </Typography>
      )}
    </Box>
  );
};

export default SignUp;
