import React from 'react';
import { getCookie } from "cookies-next";
import { getUserTaskByDate } from '@/pages/api/userTaskApi';
import GanttChart from '@/components/GanttChart/GanttChart';
import DashboardLayout from '@/pages/layout';

export default function TodaysDatePage({ retrievedTasksByDate }) {
  return (
    <DashboardLayout>
      <GanttChart retrievedTasksByDate={retrievedTasksByDate} />
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

  // get user task
  let userTasks = [];

  await getUserTaskByDate({ token, date })
  .then(res => {
   userTasks = res;
  });

  return {
     props: {
      retrievedTasksByDate: userTasks,
     }
  }
};


