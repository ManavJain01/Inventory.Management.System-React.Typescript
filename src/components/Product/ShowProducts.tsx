import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

interface Warehouse {
  _id: string;
  name: string;
  location: string;
  quantity: number;
  lowStockThreshold: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  warehouses: Warehouse[];
}

interface ShowProductsProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ShowProducts: React.FC<ShowProductsProps> = ({ products, onEdit, onDelete }) => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => toggleRow(product._id)}
                  >
                    {openRows[product._id] ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onDelete(product)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <Collapse
                    in={openRows[product._id] || false}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Table size="small" aria-label="warehouses">
                      <TableHead>
                        <TableRow>
                          <TableCell>Warehouse</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Low Stock Threshold</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product?.warehouses?.map((warehouse, index) => (
                          <TableRow key={index}>
                            <TableCell>{warehouse.name}</TableCell>
                            <TableCell>{warehouse.location}</TableCell>
                            <TableCell>{warehouse.quantity}</TableCell>
                            <TableCell>{warehouse.lowStockThreshold}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShowProducts;