// EditProduct.tsx
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  warehouseId: string;
  lowStockThreshold: number;
}

interface EditProductProps {
  product: Product;
  onEdit: (product: Product) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onEdit }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
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
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={updatedProduct.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={updatedProduct.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Warehouse ID"
        name="warehouseId"
        value={updatedProduct.warehouseId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Low Stock Threshold"
        name="lowStockThreshold"
        type="number"
        value={updatedProduct.lowStockThreshold}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
};

export default EditProduct;