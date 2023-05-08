import React from 'react';
import { Box, Typography, Button} from "@mui/material";

export default function DeleteContent({ onConfirmDelete, noDelete }) {
  return (
    <Box sx={{ textAlign: "center"}}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: "red" }}>
            Are you sure you want to delete this task ?
        </Typography>
        <Box sx={{ margin: "1rem 0"}}>
            <Button variant="contained" onClick={onConfirmDelete}>Yes</Button>
            <Button onClick={noDelete}>No</Button>
        </Box>
    </Box>
  )
}
