import React, { useState } from 'react';
import { Box, Grid, IconButton, Modal, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material/';

const MaterialCalendar = ({ defaultDate, handleOpen }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const handleClickedDate = (day) => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const fullDate = `${year}-${month}-${day}`;

    // open modal 
    handleOpen(fullDate);
  };

  const renderCalendarHeader = () => {
    return (
      <Box sx={{ display: "flex", justifyContent:"space-between", margin: "1rem auto", alignItems: "center", background: "#fff", padding: "1rem", borderRadius: "1rem" }}>
        <Typography variant="h5" align="center">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography>
        <Box>
            <IconButton onClick={handlePrevMonth}>
                <ChevronLeft />
            </IconButton>
            <IconButton onClick={handleNextMonth}>
                <ChevronRight />
            </IconButton>
        </Box>
      </Box>
    );
  };


  const renderCalendarBody = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const days = [];
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDay = defaultDate.getDate(); 

    const dayLabels = daysOfWeek.map(day => (
        <Grid item key={day}>
          <Typography variant="body1" align="center">
            {day}
          </Typography>
        </Grid>
      ));

    for (let i = 1; i <= daysInMonth + firstDayOfMonth - 1; i++) {
      if (i < firstDayOfMonth) {
        days.push(<Grid item key={i}></Grid>);
      } else {
        const date = i - firstDayOfMonth + 1;
        days.push(
          <Grid item key={i} onClick={() => handleClickedDate(date)}>
             <Box sx={{ height: "100px", background: "#fff", padding: "1rem", borderRadius: "1rem", cursor: "pointer",
                background: `${(currentDay == date && defaultDate.getMonth() == selectedDate.getMonth()) ? "#1976D2" : "#fff"}`,
                transition: ".5s ease background",
                '&:hover': { background: "#0D0C22", color: "#fff"}}}>
                <Typography variant="body1" align="center" color={`${(currentDay == date && defaultDate.getMonth() == selectedDate.getMonth()) ? "#fff" : ""}`}>
                  {date}
                </Typography>
            </Box>
          </Grid>
        );
      }
    }

    return (
        <>
            <Grid item container spacing={1} sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: "1rem"}}>
                {dayLabels}
            </Grid>
            <Grid container spacing={1} sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)"}}>
                {days}
            </Grid>
        </>
    );
  };

  return (
    <>
      <Grid container direction="column" spacing={1} sx={{ width: "100%", padding: "0" }}>
        <Grid item>{renderCalendarHeader()}</Grid>
        <Grid item>{renderCalendarBody()}</Grid>
      </Grid>
    </>
  );
};

export default MaterialCalendar;
