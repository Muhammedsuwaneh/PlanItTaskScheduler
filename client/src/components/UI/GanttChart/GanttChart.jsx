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
  if(hour === 0)
      bufferTimeString = '12 AM';
  else if(hour < 12 && hour >= 0) 
      bufferTimeString = hour + " AM";
  else
      bufferTimeString = hour + " PM";
  return bufferTimeString;
};

const options = {
  indexAxis: 'y',
  scales: {
      x: {
        title: {
          display: true,
          text: 'Hours'
        },
        ticks: {
          callback: function (value, index) {
            // format time into AM and PM
            return formatHoursIntoAMandPM(value);
          },
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
    tooltip: {
      // Customize the tooltip value
      callbacks: {
        label: function (context) {
          const value = context.raw.x; // Get the original value
          
          // Manipulate the tooltip value as desired
          const [startHr, endHr] = value;
          return formatHoursIntoAMandPM(startHr) + " - " + formatHoursIntoAMandPM(endHr);
        },
      },
    },
    datalabels: {
      centerLabels: true,
      anchor: 'start', // Set the anchor position of the labels to the center of the bars
      align: 'start', // Set the alignment of the labels to the center of the bars
      color: '#131313', // Set the color of the labels
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

  const seperateHoursAndMinutes = (time) => {

    const timeArr = time.split("T")[1];
    const timeArr2 = timeArr.split(":");
    const fullTimerStr = timeArr2[0] + "." + timeArr2[1];
    const fullTimer = parseFloat(fullTimerStr);

    return fullTimer;
  };

  const fixHoursHandler = (startTime, endTime) => {
    const fullTimer1 = seperateHoursAndMinutes(startTime);
    const fullTimer2 = seperateHoursAndMinutes(endTime);

    return [fullTimer1, fullTimer2];
  };

  const data = {
    datasets: [
      {
        data: retrievedTasksByDate.map((task) => {
          return { x: fixHoursHandler(task.startTime, task.endTime), y: task.title}
        }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: [
          getTaskStatusColor("Ongoing"),
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
