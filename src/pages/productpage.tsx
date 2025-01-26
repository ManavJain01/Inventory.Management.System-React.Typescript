import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useShowProductsMutation } from "../services/product.api";
import { toast } from "react-toastify";
import LazyComponent from "../components/LazyComponent";

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
  _id: string;
  name: string;
  price: number;
  warehouses: []
}

const ProductPage: React.FC = () => {
  // Api Functions
  const [showProducts] = useShowProductsMutation();

  // useStates
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // useEffect
  useEffect(() => {
    handleAccessProducts();
  }, []);

  // Handlers for dialog open/close
  const handleAccessProducts = async () => {
    try {
      const response = await showProducts("");
      if (!response || !response.data) {
        return;
      }

      const allProds = response.data.data as Product[];
      setProducts(allProds);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleCreateOpen = () => setIsCreateOpen(true);
  const handleCreateClose = () => setIsCreateOpen(false);

  const handleEditOpen = (product: Product, index: number) => {
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
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <h1>Product Management</h1>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOpen}
          >
            Create Product
          </Button>
        </Grid>
      </Grid>

      <LazyComponent>
        <ShowProducts
          products={products}
          onEdit={handleEditOpen}
          onDelete={handleDeleteOpen}
        />
      </LazyComponent>

      {/* Create Product Dialog */}
      <Dialog
        open={isCreateOpen}
        onClose={handleCreateClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create Product</DialogTitle>
        <DialogContent>
          <LazyComponent>
            <CreateProduct
              onCreate={(newProduct) => {
                setProducts([...products, newProduct]);
                handleCreateClose();
              }}
            />
          </LazyComponent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={isEditOpen}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <LazyComponent>
              <EditProduct
                product={selectedProduct}
                onEdit={(updatedProduct) => {
                  setProducts(
                    products.map((product) =>
                      product._id === updatedProduct._id
                        ? updatedProduct
                        : product
                    )
                  );
                  handleEditClose();
                }}
              />
            </LazyComponent>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog
        open={isDeleteOpen}
        onClose={handleDeleteClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <LazyComponent>
              <DeleteProduct
                product={selectedProduct}
                onDelete={() => {
                  setProducts(
                    products.filter(
                      (product) => product._id !== selectedProduct._id
                    )
                  );
                  handleDeleteClose();
                }}
              />
            </LazyComponent>
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
