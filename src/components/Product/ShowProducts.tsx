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
  TextField,
  Box,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

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

const ShowProducts: React.FC<ShowProductsProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filterProductsByDate = (products: Product[]) => {
    if (!fromDate && !toDate) return products;

    const from = fromDate ? new Date(fromDate) : new Date("1900-01-01");
    const to = toDate ? new Date(toDate) : new Date();

    return products.filter((product) => {
      const productDate = new Date(product._id); // Assume `_id` contains the date for filtering
      return productDate >= from && productDate <= to;
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Product List", 14, 10);
    const tableData = filterProductsByDate(products).map((product) => [
      product.name,
      product.price,
      product.warehouses.map((w) => w.name).join(", "),
    ]);

    autoTable(doc, {
      head: [["Name", "Price", "Warehouses"]],
      body: tableData,
    });

    doc.save("products.pdf");
  };

  const filteredProducts = filterProductsByDate(products);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Date Filters */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          label="From Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <TextField
          label="To Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            setFromDate("");
            setToDate("");
          }}
        >
          Reset Filters
        </Button>
      </Box>

      {/* Table */}
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
            {filteredProducts.map((product, index) => (
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
                      sx={{ marginLeft: 2 }}
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
                              <TableCell>
                                {warehouse.lowStockThreshold}
                              </TableCell>
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

      {/* Export Buttons */}
      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button variant="contained" onClick={downloadPDF}>
          Download PDF
        </Button>
        <Button variant="contained">
          <CSVLink
            data={filteredProducts}
            filename="products.csv"
            headers={[
              { label: "Name", key: "name" },
              { label: "Price", key: "price" },
              { label: "Warehouses", key: "warehouses" },
            ]}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Download CSV
          </CSVLink>
        </Button>
      </Box>
    </Box>
  );
};

export default ShowProducts;
