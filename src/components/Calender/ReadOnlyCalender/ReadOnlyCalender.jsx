import * as React from 'react';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { useRouter } from 'next/router';

export default function ReadOnlyCalender() {

  const router = useRouter();

  const formatDateHandler = (date) => {

      const year = date["$y"];
      let month = date["$M"]+1;
      let day = date["$D"]; 

      if(month < 10) month = "0" + month;
      if(day < 10) day = "0" + day;

      return year + "-" + month + "-" + day;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar defaultValue={dayjs()} onChange={((date) => {
              router.push(`/tasks/date/${formatDateHandler(date)}`);
          })}
          />
    </LocalizationProvider>
  );
}