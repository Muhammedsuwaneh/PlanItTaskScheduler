import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import ChartDataLabels from "chartjs-plugin-datalabels";

import { getTaskStatusColor } from "../../Tasks/TaskList";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

import { Box, Typography, Button } from "@mui/material";

const options = {
  indexAxis: 'y',
  scales: {
      x: {
        title: {
          display: true,
          text: 'Hours'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Daily Tasks',
      },
      ticks: {
        display: false // Set display to false to hide Y-axis values
      },
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      centerLabels: true,
      anchor: 'start', // Set the anchor position of the labels to the center of the bars
      align: 'start', // Set the alignment of the labels to the center of the bars
      color: '#EDEFF1', // Set the color of the labels
      font: {
        weight: 'bold' // Set the font weight of the labels
      },
      formatter: function(value, context) {
        // Customize the label format if needed
        return value.y; // Display the original value as the label
      }
    }
  }
};


export default function GanntChart({ retrievedTasksByDate }) {

  const test = [9, 12];

  const fixHoursHandler = (hour) => {
    return (hour < 10) ? "0"+hour : hour;
  };

  const data = {
    datasets: [
      {
        data: retrievedTasksByDate.map((task) => {
          return { x: [fixHoursHandler(test[0]), fixHoursHandler(test[1])], y: task.title}
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: [
          getTaskStatusColor("On going"),
          getTaskStatusColor("Completed"),
        ],
      },
    ],
  };

  let content = "";

  if(retrievedTasksByDate.length <= 0) {
    content = (
      <Box p={1} sx={{ display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", borderRadius: "1rem", margin: "1rem", background: "#fff", height: "50vh"}}>
          <Typography sx={{ fontSize: "2rem", textAlign: "center"}}>No tasks for today</Typography>
          <Button variant="contained" href="/tasks" sx={{ margin: "1rem auto", width: "auto"}}>Go to tasks</Button>
      </Box>
    );
  }

  else {
    content = (
            <Box p={3} sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "center", 
            margin: "1rem", background: "#fff", borderRadius: "1rem", height: "90vh", overflow: "scroll" }}>
              <Bar options={options} data={data} />
            </Box>
    );
  }

  return (
    <>
      {content}
    </>
  );
}
