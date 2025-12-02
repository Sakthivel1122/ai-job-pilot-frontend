"use client";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const CircularLoader = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress
        sx={{
          color: "var(--primary-color)",
        }}
      />
    </Box>
  );
}

export default CircularLoader;
