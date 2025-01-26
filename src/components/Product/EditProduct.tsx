import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

interface Warehouse {
  warehouse_id: string;
  name: string;  // Warehouse name
  location: string;  // Warehouse location
  quantity: number;
  lowStockThreshold: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  warehouses: Warehouse[];
}

interface EditProductProps {
  product: Product;
  onEdit: (product: Product) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onEdit }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, warehouseIndex: number) => {
    const { name, value } = e.target;
    const updatedWarehouses = [...updatedProduct.warehouses];
    updatedWarehouses[warehouseIndex] = {
      ...updatedWarehouses[warehouseIndex],
      [name]: value,
    };
    setUpdatedProduct({ ...updatedProduct, warehouses: updatedWarehouses });
  };

  const handleSubmit = () => {
    onEdit(updatedProduct);
  };

  return (
    <Box>
      <TextField
        label="Name"
        name="name"
        value={updatedProduct.name}
        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={updatedProduct.price}
        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: +e.target.value })}
        fullWidth
        margin="normal"
      />

      {/* Loop through warehouses */}
      <Typography variant="h6" gutterBottom>
        Warehouses
      </Typography>
      {updatedProduct.warehouses.map((warehouse, index) => (
        <Box key={index} mb={2}>
          <Typography variant="body1" fontWeight="bold">
            Warehouse: {warehouse.name}, {warehouse.location}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={warehouse.quantity}
                onChange={(e) => handleChange(e, index)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Low Stock Threshold"
                name="lowStockThreshold"
                type="number"
                value={warehouse.lowStockThreshold}
                onChange={(e) => handleChange(e, index)}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
};

export default EditProduct;