// DeleteProduct.tsx
import React from "react";
import { Typography, Button, Box } from "@mui/material";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  warehouseId: string;
  lowStockThreshold: number;
}

interface DeleteProductProps {
  product: Product;
  onDelete: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ product, onDelete }) => {
  return (
    <Box>
      <Typography>Are you sure you want to delete {product.name}?</Typography>
      <Box mt={2}>
        <Button variant="contained" color="secondary" onClick={onDelete}>
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteProduct;