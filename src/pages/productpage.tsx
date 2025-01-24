import React, { useState, Suspense } from "react";
import { Box, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingPage from "../components/LoadingPage";
const ShowProducts = React.lazy(
  () => import("../components/Product/ShowProducts")
);
const CreateProduct = React.lazy(
  () => import("../components/Product/CreateProduct")
);
const EditProduct = React.lazy(
  () => import("../components/Product/EditProduct")
);
const DeleteProduct = React.lazy(
  () => import("../components/Product/DeleteProduct")
);

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  warehouseId: string;
  lowStockThreshold: number;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Handlers for dialog open/close
  const handleCreateOpen = () => setIsCreateOpen(true);
  const handleCreateClose = () => setIsCreateOpen(false);

  const handleEditOpen = (product: Product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };
  const handleEditClose = () => setIsEditOpen(false);

  const handleDeleteOpen = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };
  const handleDeleteClose = () => setIsDeleteOpen(false);

  return (
    <Box p={3}>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item>
          <h1>Product Management</h1>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleCreateOpen}>
            Create Product
          </Button>
        </Grid>
      </Grid>

      <ErrorBoundary>
        <Suspense fallback={<LoadingPage />}>
          <ShowProducts
            products={products}
            onEdit={handleEditOpen}
            onDelete={handleDeleteOpen}
          />
        </Suspense>
      </ErrorBoundary>

      {/* Create Product Dialog */}
      <Dialog open={isCreateOpen} onClose={handleCreateClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Product</DialogTitle>
        <DialogContent>
          <ErrorBoundary>
            <Suspense fallback={<LoadingPage />}>
              <CreateProduct
                onCreate={(newProduct) => {
                  setProducts([...products, newProduct]);
                  handleCreateClose();
                }}
              />
            </Suspense>
          </ErrorBoundary>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <ErrorBoundary>
              <Suspense fallback={<LoadingPage />}>
                <EditProduct
                  product={selectedProduct}
                  onEdit={(updatedProduct) => {
                    setProducts(
                      products.map((product) =>
                        product.id === updatedProduct.id ? updatedProduct : product
                      )
                    );
                    handleEditClose();
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteOpen} onClose={handleDeleteClose} fullWidth maxWidth="sm">
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <ErrorBoundary>
              <Suspense fallback={<LoadingPage />}>
                <DeleteProduct
                  product={selectedProduct}
                  onDelete={() => {
                    setProducts(products.filter((product) => product.id !== selectedProduct.id));
                    handleDeleteClose();
                  }}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductPage;