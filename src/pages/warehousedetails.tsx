import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LazyComponent from "../components/LazyComponent";
import { useGetWarehouseByIdMutation } from "../services/warehouse.api";
const ShowProductsByWarehouseIdComponent = React.lazy(
  () => import("../components/Warehouse/showProductsByWarehouseId")
);

const AddProductInWarehouse = React.lazy(
  () => import("../components/Warehouse/addProductInWarehouse")
);

const DetailsPage: React.FC = () => {
  // useParams
  const { id } = useParams(); // Get warehouse ID from the route

  // Api Calls
  const [getWarehouseById] = useGetWarehouseByIdMutation();

  // useState
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [manager, setManager] = useState();

  // useEffect
  useEffect(() => {
    fetchWarehouse(); // Fetch all available products
  }, [id]);

  const fetchWarehouse = async () => {
    const res = await getWarehouseById(id as string);

    if (!res.data) return;

    setName(res.data.data.name);
    setLocation(res.data.data.location);
    setManager(res.data.data.managerId);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Warehouse Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        {name}, {location}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Manager: {manager}
      </Typography>

      {/* Products in Warehouse */}
      <Typography variant="h5" gutterBottom>
        Products in {name}
      </Typography>

      {/* Show Products By Warehouse Id */}
      <LazyComponent>
        <ShowProductsByWarehouseIdComponent />
      </LazyComponent>

      <LazyComponent>
        <AddProductInWarehouse />
      </LazyComponent>
    </Box>
  );
};

export default DetailsPage;
