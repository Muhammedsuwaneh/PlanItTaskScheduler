import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout';
import Dashboard from '@/components/Dashboard/Dashboard';

import { getCookie } from 'cookies-next';

import { getUserTask, getUserTaskStatistics, getUserMonthlyTaskCount } from '../api/userTaskApi';

export default function DashboardPage({ user, userTasks, userTaskStatistics, taskCountEveryMonth }) {

  let filteredTasksBasedOnStatus = userTasks.filter(t => t.status == "Ongoing");

  if(filteredTasksBasedOnStatus.length >= 3) 
    filteredTasksBasedOnStatus = filteredTasksBasedOnStatus.slice(0, 3);

  return (
    <DashboardLayout>
        <Dashboard user={user} userTasks={filteredTasksBasedOnStatus} userStatisticsEntries={userTaskStatistics}
        taskCountEveryMonth={taskCountEveryMonth} />
    </DashboardLayout>
  )
}

export const getServerSideProps = async({ req, res }) => {

   const option = { req, res};
   const token = getCookie("USER_AUTH_TOKEN", option);
   const username = getCookie("USER_AUTH_USERNAME", option);

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
   let userTasks = [], userStatistics = [], userTaskStatistics = {}, taskCountEveryMonth = [];

   await getUserTask({ token })
   .then(res => {
    userTasks = res;
   });

   await getUserTaskStatistics({ token })
   .then(res => {
      userStatistics = res;
      userTaskStatistics = { "Ongoing": (userStatistics.Ongoing == undefined) ? 0 : userStatistics.Ongoing, 
      "Completed": (userStatistics.Completed == undefined) ? 0 : userStatistics.Completed};
   });

   await getUserMonthlyTaskCount({ token })
   .then(res => {
    taskCountEveryMonth = res;
   });

   return {
      props: {
        user: username,
        userTasks: userTasks,
        userTaskStatistics: userTaskStatistics,
        taskCountEveryMonth: taskCountEveryMonth,
      }
   }
};
