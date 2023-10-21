import React from 'react';
import { Box, Typography } from "@mui/material";

export default function PageTitle({ title, children }) {
  return (
    <Box sx={{ borderRadius: "1rem", padding: "1rem", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontSize: "1.4rem", color: "#0F4AC7"}}>{title}</Typography>
        { children }
    </Box>
  )
}
