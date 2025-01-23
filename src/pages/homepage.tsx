import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 4,
        textAlign: "center",
        p: 3,
      }}
    >
      <Button color="primary" variant="contained">
        Primary Button
      </Button>

      <Typography variant="h3" component="h1" gutterBottom>
        {t("home page.welcome")}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {t("home page.description")}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Manage Users
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add, update, and delete user profiles with ease.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/users"
                variant="contained"
              >
                Go to Users
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Manage Products
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track and organize your product inventory effortlessly.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/products"
                variant="contained"
              >
                Go to Products
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Manage Warehouses
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep track of warehouse locations and stock levels.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={Link}
                to="/warehouses"
                variant="contained"
              >
                Go to Warehouses
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Button variant="outlined" component={Link} to="/signup">
        Get Started
      </Button>
    </Box>
  );
};

export default HomePage;
