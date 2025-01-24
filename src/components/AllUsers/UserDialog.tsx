import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import { createUser, updateUser } from '../api/users';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  user?: any;
  onSave: () => void;
}

const UserDialog: React.FC<UserDialogProps> = ({ open, onClose, user, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSave = async () => {
    const userData = { name, email, password, role };
    if (user) {
      // await updateUser(user._id, userData);
    } else {
      // await createUser(userData);
    }
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user ? 'Edit User' : 'Create User'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!user && (
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <FormControl fullWidth margin="dense">
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
            <MenuItem value="MANAGER">MANAGER</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
