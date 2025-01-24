// ShowProducts.tsx
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from "@mui/material";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  warehouseId: string;
  lowStockThreshold: number;
}

interface ShowProductsProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ShowProducts: React.FC<ShowProductsProps> = ({ products, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Warehouse ID</TableCell>
            <TableCell>Low Stock Threshold</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.warehouseId}</TableCell>
              <TableCell>{product.lowStockThreshold}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => onEdit(product)}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => onDelete(product)}>
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

export default ShowProducts;