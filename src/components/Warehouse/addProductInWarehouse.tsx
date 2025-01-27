import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShowFilteredProductsMutation } from "../../services/product.api";
import useDebouncing from "../../Custom Hooks/useDebouncing";

export default function AddProductInWarehouse() {
  // useParams
  const { id } = useParams(); // Get warehouse ID from the route

  // Api Calls
  const [showFilteredProducts] = useShowFilteredProductsMutation();

  // useState
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // All products
  const [search, setSearch] = useState(""); // Search input

  //   debouncing
  const debouncedSearchTerm = useDebouncing(search);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (debouncedSearchTerm) {
        console.log("debouncedSearchTerm: ", debouncedSearchTerm);

        const res = await showFilteredProducts(debouncedSearchTerm);
        console.log("res:", res);
        setFilteredProducts(res.data.data); // Assuming `res` contains the filtered products
      } else {
        setFilteredProducts([]); // Reset when search term is empty
      }
    };

    fetchFilteredProducts();
  }, [debouncedSearchTerm]);

  // Mock API call to add a new product
  const addWarehouseProduct = async (warehouseId: string, product: any) => {
    console.log("Adding Product:", product, "to Warehouse:", warehouseId);
    // Simulate API response
    return { success: true, product: { ...product, _id: "new_id" } };
  };

  // Add existing product to warehouse
  const handleAddExistingProduct = async (product: any) => {
    const response = await addWarehouseProduct(id!, {
      name: product.name,
      quantity: 1, // Default quantity
      lowStockThreshold: product.lowStockThreshold || 0,
    });
  };

  return (
    <Box>
      {/* Search and Add Existing Products */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Add Existing Product
      </Typography>
      <TextField
        label="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleAddExistingProduct(product)}
                >
                  Add to Warehouse
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
