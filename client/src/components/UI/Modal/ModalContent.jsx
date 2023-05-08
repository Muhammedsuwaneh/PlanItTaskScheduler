import React from 'react';
import { Box } from "@mui/material";

const style = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    margin: "auto"
};

export default function ModalContent(props) {
  return (
    <Box sx={{ ...style, width: { sm: "350px", xs: "320px", md: "400px", lg: "500px"}, height: props.height, 
    top: { sm: "50%", xs: "50%", md: "50%", lg: "30%"}}}>
        {props.children}
    </Box>
  )
}
