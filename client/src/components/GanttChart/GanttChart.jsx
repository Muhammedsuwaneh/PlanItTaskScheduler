import React from 'react';
import { Box, Button, Stack, Paper, Typography } from '@mui/material';

const data = {
  datasets: [{
    label: [ 'Daily Task'],
    data: [
     { x: ['20', '23'], y:  'Task 1'},
     { x: ['02', '05'], y:  'Task 2'},
     { x: ['13', '15'], y:  'Task 3'},
    ],
    backgroundColor: [
      '#1976D2',
      '#F87D01',
      '#F87D01',
    ],
    borderColor: [
      '#1976D2',
      '#F87D01',
      '#F87D01',
    ],
    borderWidth: 1
  }]
};

const GanttChart = ({ retrievedTasksByDate, date }) => {
  return (
      <Box p={2} sx={{ background: "#fff", margin: '1rem', borderRadius:"1rem"}}>
        {/* <CChart
          type="bar"
          data={data}
          options={{
            indexAxis: 'y',
            scales: {
              x: { 
                type: 'linear',
              }
            },
            plugins: [ChartDataLabels],
          }}
        /> */}
      </Box>
  );
};

export default GanttChart;
