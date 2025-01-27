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
import { motion } from "framer-motion";
import { useAppSelector } from "../store/store";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const authdata = useAppSelector((store) => store.auth);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: "100%" }}
    >
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
        <motion.div variants={itemVariants}>
          <Typography variant="h3" component="h1" gutterBottom>
            {t("home page.welcome")}
          </Typography>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Typography variant="h6" gutterBottom>
            {t("home page.description")}
          </Typography>
        </motion.div>

        <Grid container spacing={3} justifyContent="center">
          {[
            {
              title: "Manage Users",
              description: "Add, update, and delete user profiles with ease.",
              to: "/all-users",
            },
            {
              title: "Manage Products",
              description: "Track and organize your product inventory effortlessly.",
              to: "/products",
            },
            {
              title: "Manage Warehouses",
              description: "Keep track of warehouse locations and stock levels.",
              to: "/warehouse",
            },
          ].map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              component={motion.div}
              variants={itemVariants}
            >
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={item.to}
                    variant="contained"
                  >
                    Go to {item.title.split(" ")[1]}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {!authdata.isAuthenticated && (
          <motion.div variants={itemVariants}>
            <Button variant="outlined" component={Link} to="/signup">
              Get Started
            </Button>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default HomePage;
