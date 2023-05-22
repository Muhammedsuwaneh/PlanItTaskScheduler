import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function TaskDetail(props) {
  return (
    <Card sx={{ minWidth: 275}}>
      <CardContent>
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
          Time: {props.startTime.split("T")[1]} - {props.endTime.split("T")[1]}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: "red"}} onClick={props.handleClose}>Close</Button>
      </CardActions>
    </Card>
  );
}