import React, { useEffect, useState } from "react";
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useShowWarehousesMutation } from "../../services/warehouse.api";

interface Warehouse {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  warehouseId: string;
  lowStockThreshold: number;
}

interface CreateProductProps {
  onCreate: (product: Product) => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({ onCreate }) => {
  // Api Calls
  const [showWarehouses] = useShowWarehousesMutation();
  // useState
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [product, setProduct] = useState<Omit<Product, "_id">>({
    name: "",
    price: 0,
    quantity: 0,
    warehouseId: "",
    lowStockThreshold: 0,
  });

  // useEffect
  useEffect(() => {
    handleShowWarehouses();
  }, []);

  // Functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = () => {
    const newProduct = { ...product, _id: Date.now().toString() };
    onCreate(newProduct);
  };

  const handleShowWarehouses = async () => {
    const res = await showWarehouses("");
    if (res.data?.data) {
      setWarehouses(res.data.data);
    }
  };

  return (
    <Box>
      <TextField
        label="Name"
        name="name"
        value={product.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={product.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="warehouse-label">Warehouse</InputLabel>
        <Select
          labelId="warehouse-label"
          name="warehouseId"
          value={product.warehouseId}
          onChange={handleChange}
        >
          {warehouses.map((warehouse) => (
            <MenuItem key={warehouse._id} value={warehouse._id}>
              {warehouse.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Low Stock Threshold"
        name="lowStockThreshold"
        type="number"
        value={product.lowStockThreshold}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create
      </Button>
    </Box>
  );
};

export default CreateProduct;