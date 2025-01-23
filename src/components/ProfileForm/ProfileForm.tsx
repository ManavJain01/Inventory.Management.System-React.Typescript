// src/components/ProfileForm.tsx

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import styles from "./ProfileForm.module.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<FormData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing) {
        await axios.put("/api/profile", data); // Mock API endpoint for updating
      } else {
        await axios.post("/api/profile", data); // Mock API endpoint for creating
      }
      fetchProfile(); // Refresh profile data after submitting
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  // Delete the profile
  const handleDelete = async () => {
    try {
      await axios.delete("/api/profile"); // Mock API endpoint for deleting
      setProfile(null); // Clear profile state
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

  useEffect(() => {
    fetchProfile(); // Fetch profile data when component mounts
  }, []);

  return (
    <Box className={styles.formContainer}>
      <Typography variant="h4" className={styles.title}>
        {isEditing ? "Edit Profile" : "Profile"}
      </Typography>

      {profile ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("firstName", { required: "First name is required" })}
            label="First Name"
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            disabled={!isEditing}
          />
          <TextField
            {...register("lastName", { required: "Last name is required" })}
            label="Last Name"
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
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
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={!isEditing}
          />
          <TextField
            {...register("phone", { required: "Phone number is required" })}
            label="Phone Number"
            fullWidth
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            disabled={!isEditing}
          />

          {isEditing ? (
            <Button type="submit" variant="contained" color="primary" fullWidth>
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
      ) : (
        <Typography variant="h6">
          No profile found. Create a new one.
        </Typography>
      )}
    </Box>
  );
};

export default ProfileForm;
