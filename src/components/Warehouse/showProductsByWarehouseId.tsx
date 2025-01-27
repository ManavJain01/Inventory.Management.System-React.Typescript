import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useShowProductsByWarehouseIdMutation } from "../../services/warehouse.api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function showProductsByWarehouseId() {
  // Api Calls
  const [showProductsByWarehouseId] = useShowProductsByWarehouseIdMutation();

  // useParams
  const { id } = useParams(); // Get warehouse ID from the route

  // useState
  const [products, setProducts] = useState<any[]>([]); // Products in the warehouse

  // useEffect
  // Fetch warehouse products on component mount
  useEffect(() => {
    fetchProductsByWarehouseId(id as string);
  }, [id]);

  // Fetch products by warehouse ID
  const fetchProductsByWarehouseId = async (warehouseId: string) => {
    const res = await showProductsByWarehouseId(warehouseId);
    setProducts(res.data.data);
  };

  if (products.length <= 0) {
    return <Typography>No products available for this warehouse.</Typography>;
  } else {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Low Stock Threshold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.lowStockThreshold}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
