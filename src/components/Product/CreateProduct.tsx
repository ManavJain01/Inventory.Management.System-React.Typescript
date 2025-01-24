// CreateProduct.tsx
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface Product {
  id: string;
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
  const [product, setProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    quantity: 0,
    warehouseId: "",
    lowStockThreshold: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newProduct = { ...product, id: Date.now().toString() };
    onCreate(newProduct);
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
      <TextField
        label="Warehouse ID"
        name="warehouseId"
        value={product.warehouseId}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
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