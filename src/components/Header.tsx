// Importing React Icons
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { ThemeContext } from "../ThemeContext";
import { ReactComponent as Logo } from "../../public/vite.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";

const Header: React.FC = () => {
  // useSelector
  const authData = useAppSelector((store) => store.auth);

  // Context APi
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeContextProvider");
  }

  const username = "Manav"; // Replace with dynamic username

  // useState
  const { toggleTheme, mode } = themeContext;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // useEffect
  useEffect(() => {
    if (authData.accessToken) handleAuthentication(true);
  }, []);

  // Functions
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAuthentication = (bool: boolean) => {
    setIsAuthenticated(bool);
  };

  return (
    <AppBar position="static" color={mode === "light" ? "default" : "primary"}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "15px" }}
        >
          <Logo width={30} height={30} />
          <Typography variant="h6">Inventory Management</Typography>
        </Link>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {isAuthenticated ? (
            <div>
              <Button color="inherit" onClick={handleMenuClick}>
                Hi, {username}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Link to="/login" color="inherit">
                Login
              </Link>
              <Link to="/signup" color="inherit">
                Signup
              </Link>
            </>
          )}

          <Button color="inherit">Product</Button>
          <Button color="inherit">Warehouse</Button>

          <Button variant="contained" onClick={toggleTheme}>
            {mode === "light" ? (
              <MdSunny size={20} color={"yellow"} />
            ) : (
              <FaMoon size={20} color={"#ffffff"} />
            )}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
