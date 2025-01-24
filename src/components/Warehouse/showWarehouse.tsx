import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

type Warehouse = {
  id: string;
  name: string;
  location: string;
  managerId: string;
};

const ShowWarehouses: React.FC<{
  warehouses: Warehouse[];
  onEdit: (warehouse: Warehouse) => void;
  onDelete: (id: string) => void;
}> = ({ warehouses, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Manager ID</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warehouses.map((warehouse) => (
            <TableRow key={warehouse.id}>
              <TableCell>{warehouse.name}</TableCell>
              <TableCell>{warehouse.location}</TableCell>
              <TableCell>{warehouse.managerId}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onEdit(warehouse)}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(warehouse.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowWarehouses;