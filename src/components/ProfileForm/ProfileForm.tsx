import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // No need to import setValue explicitly
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
} from "@mui/material";
import axios from "axios";
import styles from "./ProfileForm.module.css";
import { useAppSelector } from "../../store/store";
import { useUpdateUserMutation } from "../../services/user.api";

interface FormData {
  name: string;
  email: string;
  role: string;
}

const ProfileForm: React.FC = () => {
  // uaseSelector
  const authData = useAppSelector((store) => store.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  // useState
  const [profile, setProfile] = useState<FormData>({
    name: "",
    email: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // useEffect
  useEffect(() => {
    if (authData.name || authData.email || authData.role) {
      setProfile({
        name: authData.name,
        email: authData.email,
        role: authData.role,
      });
    }
    // fetchProfile(); // Fetch profile data when component mounts
  }, []);

  const {
    register,
    reset,
    formState: { errors },
    setValue, // Accessing setValue from useForm
  } = useForm<FormData>();

  // Fetch the profile data from the backend (Mock API)
  const fetchProfile = async () => {
    try {
      const response = await axios.get("/api/profile"); // Mock endpoint
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Create or Update the profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await updateProfile({ id: authData.id, data: profile });
      console.log("data: ", data);

      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  // Delete the profile
  const handleDelete = async () => {
    try {
      await axios.delete("/api/profile"); // Mock API endpoint for deleting
      setProfile({ name: "", email: "", role: "" }); // Clear profile state
      reset(); // Reset form
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  // Handle editing the profile
  const handleEdit = () => {
    if (profile) {
      reset(profile); // Pre-fill form with existing profile data
      setIsEditing(true);
    }
  };

  if (!profile)
    return (
      <Stack direction="column" gap="20px">
        <Typography variant="h4" className={styles.title}>
          Profile
        </Typography>

        <Typography variant="h6">
          No profile found. Create a new one.
        </Typography>
      </Stack>
    );
  else
    return (
      <Box className={styles.formContainer}>
        <Typography variant="h4" className={styles.title}>
          Edit Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            {...register("name", { required: "Name is required" })}
            label={"Name"}
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            autoFocus
            disabled={!isEditing}
          />
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            autoFocus
            label={"Email"}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={!isEditing}
          />
          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <Select
              labelId="role-label"
              {...register("role", { required: "Role is required" })}
              value={profile.role}
              onChange={(e) => setValue("role", e.target.value)} // Corrected here
              disabled={!isEditing}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="MANAGER">MANAGER</MenuItem>
            </Select>
            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>

          {isEditing ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleDelete}
            >
              Save Changes
            </Button>
          ) : (
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEdit}
                fullWidth
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
                fullWidth
              >
                Delete Profile
              </Button>
            </Box>
          )}
        </form>
      </Box>
    );
};

export default ProfileForm;
