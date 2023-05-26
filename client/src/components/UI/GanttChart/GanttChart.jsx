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

const formatHoursIntoAMandPM = (hour) => {
  let bufferTimeString = "";
  if(hour == 0)
      bufferTimeString = '12 AM';
  else if(hour < 12 && hour >= 0) 
      bufferTimeString = `${hour} AM`;
  else
      bufferTimeString = `${24-hour} PM`;
  return bufferTimeString;
};

const options = {
  indexAxis: 'y',
  scales: {
      x: {
        title: {
          display: true,
          text: 'Hours',
          color: '#F87D01',
          font: {
            weight: 'bold',
            size: '15px',
          }
        },
        ticks: {
          callback: function (value, index) {
            // format time into AM and PM
            return value;
          },
          color: "#fff",
        },
        grid: {
          color: "#1976D2",
        }
      },
      y: {
        title: {
          display: true,
          text: 'Daily Tasks',
          color: '#F87D01',
          font: {
            weight: 'bold',
            size: '15px',
          }
      },
      grid: {
        color: "",
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
    tooltip: {
      // Customize the tooltip value
      callbacks: {
        label: function (context) {
          const value = context.raw.x; // Get the original value
          
          // Manipulate the tooltip value as desired
          const [startHr, endHr] = value;
          return startHr + " - " + endHr;
        },
      },
    },
    datalabels: {
      centerLabels: true,
      anchor: 'start', // Set the anchor position of the labels to the center of the bars
      align: 'start', // Set the alignment of the labels to the center of the bars
      color: '#fff', // Set the color of the labels
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

  const seperateHoursAndMinutes = (timeString) => {

    let timeParts = timeString.split(":"); // Split the string into hours and minutes

    let hours = parseInt(timeParts[0]); // Parse the hours as an integer
    let minutes = parseInt(timeParts[1]); // Parse the minutes as an integer

    let timesJoined = hours + '.' + minutes;

    let timeInFloat = parseFloat(timesJoined); // Convert the time to a float

    let roundedTime = timeInFloat.toFixed(2); // Round the float to 2 decimal places
    return parseFloat(roundedTime);
  };

  const data = {
    datasets: [
      {
        data: retrievedTasksByDate.map((task) => {
          const times = [seperateHoursAndMinutes(task.startTime), seperateHoursAndMinutes(task.endTime)];
          console.log(times);
          return { x: times, y: task.title}
        }),
        borderColor: 'red',
        backgroundColor: 
          retrievedTasksByDate.map((task) => {
            return getTaskStatusColor(task.status);
          }),
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
            margin: "1rem", borderRadius: ".5rem", height: "100vh", overflowY: "scroll", background: "#0E141E"}}>
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
