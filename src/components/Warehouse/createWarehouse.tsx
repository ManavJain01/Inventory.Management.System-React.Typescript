import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useShowManagersMutation } from "../../services/user.api";

type Warehouse = {
  _id: string;
  name: string;
  location: string;
  managerId: string;
};

type Manager = {
  _id: string;
  name: string;
};

const CreateWarehouse: React.FC<{
  warehouse: Warehouse | null;
  onClose: () => void;
  onSave: (warehouse: Warehouse) => void;
}> = ({ warehouse, onClose, onSave }) => {
  // Api Calls
  const [showManagers] = useShowManagersMutation();

  const navigate = useNavigate();

  // useState
  const [formData, setFormData] = useState<Warehouse>(
    warehouse || { _id: "", name: "", location: "", managerId: "" }
  );
  const [managers, setManagers] = useState<Manager[]>([]);

  // useEffect
  useEffect(() => {
    handleManagers();
  }, []);

  // Functions
  const handleManagers = async () => {
    const res = await showManagers("");

    setManagers(res.data.data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleManagerChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({ ...prev, managerId: e.target.value as string }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.location && formData.managerId) {
      onSave(formData);
    }
  };

  const handleMoreDetails = () => {
    if (warehouse && warehouse._id) {
      navigate(`/warehouse/${warehouse._id}`);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {warehouse ? "Edit Warehouse" : "Create Warehouse"}
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="manager-select-label">Manager</InputLabel>
          <Select
            labelId="manager-select-label"
            value={formData.managerId}
            onChange={handleManagerChange}
            name="managerId"
          >
            {Array.isArray(managers) &&
              managers?.map((manager, index) => (
                <MenuItem key={index} value={manager._id}>
                  {manager.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "20px",
            marginTop: 2,
          }}
        >
          <Button onClick={onClose} sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>

          {warehouse && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleMoreDetails}
            >
              More Details
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateWarehouse;
