import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import LazyComponent from "../components/LazyComponent";
import { useShowWarehousesMutation } from "../services/warehouse.api";
import { toast } from "react-toastify";
const CreateWarehouse = React.lazy(
  () => import("../components/Warehouse/createWarehouse")
);

const ShowWarehouses = React.lazy(
  () => import("../components/Warehouse/showWarehouse")
);

type Warehouse = {
  _id: string;
  name: string;
  location: string;
  managerId: string;
};

const mockData: Warehouse[] = [
  { _id: "1", name: "Warehouse A", location: "New York", managerId: "101" },
  {
    _id: "2",
    name: "Warehouse B",
    location: "San Francisco",
    managerId: "102",
  },
];

const WarehousePage: React.FC = () => {
  // Api Calls
  const [showWarehouses] = useShowWarehousesMutation();

  // useState
  const [warehouses, setWarehouses] = useState<Warehouse[]>(mockData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(
    null
  );

  // useEffect
  useEffect(() => {
    handleShowWarwhouses();
  }, []);

  // Functions
  const handleShowWarwhouses = async () => {
    try {
      const response = await showWarehouses("");

      if (!response || !response.data) {
        return;
      }

      const allWarehouses = response.data.data as Warehouse[];
      setWarehouses(allWarehouses);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleCreateWarehouse = (warehouse: Warehouse) => {
    setWarehouses([...warehouses, { ...warehouse, _id: String(Date.now()) }]);
    setModalOpen(false);
  };

  const handleEditWarehouse = (updatedWarehouse: Warehouse) => {
    setWarehouses(
      warehouses.map((wh) =>
        wh._id === updatedWarehouse._id ? updatedWarehouse : wh
      )
    );
    setCurrentWarehouse(null);
    setModalOpen(false);
  };

  const handleDeleteWarehouse = (id: string) => {
    setWarehouses(warehouses.filter((warehouse) => warehouse._id !== id));
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

      <LazyComponent>
        <ShowWarehouses
          warehouses={warehouses}
          onEdit={(warehouse) => {
            setCurrentWarehouse(warehouse);
            setModalOpen(true);
          }}
          onDelete={handleDeleteWarehouse}
        />
      </LazyComponent>

      {modalOpen && (
        <LazyComponent>
          <CreateWarehouse
            warehouse={currentWarehouse}
            onClose={() => setModalOpen(false)}
            onSave={
              currentWarehouse ? handleEditWarehouse : handleCreateWarehouse
            }
          />
        </LazyComponent>
      )}
    </Box>
  );
};

export default WarehousePage;
