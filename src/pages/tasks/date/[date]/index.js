import React from 'react';
import { getCookie } from "cookies-next";
import { getUserTaskByDate } from '@/pages/api/userTaskApi';
import DailyTask from '@/components/DailyTask/DailyTask';
import DashboardLayout from '@/pages/layout';

export default function TodaysDatePage({ retrievedTasksByDate, date }) {
  return (
    <DashboardLayout>
      <DailyTask retrievedTasksByDate={retrievedTasksByDate} date={date} />
    </DashboardLayout>
  )
}

export const getServerSideProps = async({ req, res, query }) => {

  const option = { req, res};
  const { date } = query;
   const token = getCookie("USER_AUTH_TOKEN", option);

  if(token == null || token === ""  || token == undefined) {
       return {
         redirect: {
           permanent: false,
           destination: "/404",
         },
         props:{},
       }
  }

  let userTasks = [];

  await getUserTaskByDate({ token, date })
  .then(res => {
   userTasks = res;
  });

  return {
     props: {
      retrievedTasksByDate: userTasks,
      date: date
     }
  }
};


