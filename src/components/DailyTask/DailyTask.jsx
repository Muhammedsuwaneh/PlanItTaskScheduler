import React from 'react';
import { Box, Button, Stack, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import GanttChart from '../UI/GanttChart/GanttChart';

const DailyTask = ({ retrievedTasksByDate, date }) => {
  return (
      <Box>
        <Box p={2} sx={{ flexGrow: 1, display: "flex", margin: "1rem", justifyContent: "space-between", alignItems: "center", background: "#fff", 
        borderRadius: "1rem" }}>
          <Button component="a" href={`/calender`} sx={{ '&:hover': { color: "#131313"} }}>
            Go to calender
          </Button>
          <Typography fontSize="1rem" color="#1976D2">
            {date}
          </Typography>
        </Box>
        <GanttChart retrievedTasksByDate={retrievedTasksByDate} />
      </Box>
  );
};

export default DailyTask;
