import React, { Suspense, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LoadingPage from '../components/LoadingPage';
import ErrorBoundary from '../components/ErrorBoundary';
const CreateWarehouse = React.lazy(
  () => import("../components/Warehouse/createWarehouse")
);

const ShowWarehouses = React.lazy(
  () => import("../components/Warehouse/showWarehouse")
);

type Warehouse = {
  id: string;
  name: string;
  location: string;
  managerId: string;
};

const mockData: Warehouse[] = [
  { id: '1', name: 'Warehouse A', location: 'New York', managerId: '101' },
  { id: '2', name: 'Warehouse B', location: 'San Francisco', managerId: '102' },
];

const WarehousePage: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(mockData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);

  const handleCreateWarehouse = (warehouse: Warehouse) => {
    setWarehouses([...warehouses, { ...warehouse, id: String(Date.now()) }]);
    setModalOpen(false);
  };

  const handleEditWarehouse = (updatedWarehouse: Warehouse) => {
    setWarehouses(
      warehouses.map((wh) => (wh.id === updatedWarehouse.id ? updatedWarehouse : wh))
    );
    setCurrentWarehouse(null);
    setModalOpen(false);
  };

  const handleDeleteWarehouse = (id: string) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Warehouse Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setCurrentWarehouse(null);
          setModalOpen(true);
        }}
      >
        Create Warehouse
      </Button>

      <ErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <ShowWarehouses
            warehouses={warehouses}
            onEdit={(warehouse) => {
              setCurrentWarehouse(warehouse);
              setModalOpen(true);
            }}
            onDelete={handleDeleteWarehouse}
          />
        </Suspense>
      </ErrorBoundary>

      {modalOpen && (
        <ErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <CreateWarehouse
            warehouse={currentWarehouse}
            onClose={() => setModalOpen(false)}
            onSave={currentWarehouse ? handleEditWarehouse : handleCreateWarehouse}
          />
        </Suspense>
      </ErrorBoundary>
      )}
    </Box>
  );
};

export default WarehousePage;
