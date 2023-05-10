import React from 'react';
import { Box, Button, Grid, Stack, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { experimentalStyled as styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const GanttChart = ({ retrievedTasksByDate }) => {
  const tasks = [
    { id: 1, name: 'Task 1', start: 8, end: 12 },
    { id: 2, name: 'Task 2', start: 10, end: 14 },
    { id: 3, name: 'Task 3', start: 13, end: 16 },
  ];

  return (
    <Box p={3} sx={{ flexGrow: 1 }}>
        <Button component="a" href={`/calender`} sx={{ '&:hover': { color: "#131313"} }}>
          <ArrowBackIcon sx={{ fontSize: '3rem'}}></ArrowBackIcon>
        </Button>
        <Stack sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumnStart="2" gridColumn="span 3" margin="1rem 0">
              <Item>xs=8</Item>
            </Box>
          </Box> 
        </Stack>
    </Box>
  );
};

export default GanttChart;
