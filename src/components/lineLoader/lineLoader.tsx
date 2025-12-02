"use client";
import { styled } from "@mui/material/styles";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";

const CustomLinearProgress = styled((props: LinearProgressProps) => (
  <LinearProgress {...props} />
))(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  backgroundColor: "#0000000d", // track color
  "& .MuiLinearProgress-bar": {
    backgroundColor: "var(--primary-color)", // bar color

  },
}));

export default function LineLoader() {
  return <CustomLinearProgress />;
}
