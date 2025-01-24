import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField } from '@mui/material';

type Warehouse = {
  id: string;
  name: string;
  location: string;
  managerId: string;
};

const CreateWarehouse: React.FC<{
  warehouse: Warehouse | null;
  onClose: () => void;
  onSave: (warehouse: Warehouse) => void;
}> = ({ warehouse, onClose, onSave }) => {
  const [formData, setFormData] = useState<Warehouse>(
    warehouse || { id: '', name: '', location: '', managerId: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.location && formData.managerId) {
      onSave(formData);
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {warehouse ? 'Edit Warehouse' : 'Create Warehouse'}
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
        <TextField
          label="Manager ID"
          name="managerId"
          value={formData.managerId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button onClick={onClose} sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateWarehouse;