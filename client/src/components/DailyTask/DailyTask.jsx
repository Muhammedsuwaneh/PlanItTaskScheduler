import React from 'react';
import { Box, Button, Stack, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import GanttChart from '../UI/GanttChart/GanttChart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DailyTask = ({ retrievedTasksByDate, date }) => {
  const tasks = [
    { id: 1, name: 'Task 1', start: 8, end: 12 },
    { id: 2, name: 'Task 2', start: 10, end: 14 },
    { id: 3, name: 'Task 3', start: 13, end: 16 },
  ];

  return (
      <Box p={2}>
        <Box p={2} sx={{ flexGrow: 1, display: "flex", margin: "1rem", justifyContent: "space-between", alignItems: "center", background: "#fff", 
        borderRadius: "1rem" }}>
          <Button component="a" href={`/calender`} sx={{ '&:hover': { color: "#131313"} }}>
            <ArrowBackIcon sx={{ fontSize: '2.5rem'}}></ArrowBackIcon>
          </Button>
          <Typography fontSize="1.2rem" color="#1976D2">
            {date}
          </Typography>
        </Box>
        <GanttChart retrievedTasksByDate={retrievedTasksByDate} date={date} />
      </Box>
  );
};

export default DailyTask;
