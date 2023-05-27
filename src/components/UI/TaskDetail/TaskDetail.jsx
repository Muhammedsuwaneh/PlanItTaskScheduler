import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function TaskDetail(props) {
  return (
    <Box sx={{ minWidth: 275}}>
      <Stack>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Task detail
        </Typography>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          status: {props.status}
        </Typography>
        <Typography variant="body2">
          {props.description}
        </Typography>
        <Typography variant="body2" marginTop="1rem">
          Date: {props.dateAdded}
          <br />
          Time: {props.startTime} - {props.endTime}
        </Typography>
      </Stack>
      <Button sx={{ color: "red", margin: "1rem 0" }} onClick={props.handleClose}>Close</Button>
    </Box>
  );
}