import React from 'react';
import { Box, Typography, Button} from "@mui/material";

export default function MarkAsCompleted({ onMarkConfirmed, noAction }) {
  return (
    <Box sx={{ textAlign: "center"}}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Mark as completed
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: "red" }}>
            Are you sure you want to mark task as completed ?
        </Typography>
        <Box sx={{ margin: "1rem 0"}}>
            <Button variant="contained" onClick={onMarkConfirmed}>Yes</Button>
            <Button onClick={noAction}>No</Button>
        </Box>
    </Box>
  )
}
