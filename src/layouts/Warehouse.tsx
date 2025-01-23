import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from "react";

const Warehouse: React.FC = () => {
  return (
    <Stack direction={"column"} justifyContent={"space-between"}>
      <Box sx={{ minHeight: "80vh", flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Warehouse;
