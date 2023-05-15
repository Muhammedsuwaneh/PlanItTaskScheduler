import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout';
import Dashboard from '@/components/Dashboard/Dashboard';
import { getCookie } from 'cookies-next';
import { getUserTask, getUserTaskStatistics, getUserTaskByDate } from '../api/userTaskApi';
import dayjs from 'dayjs';
export default function DashboardPage({ user, userTasks, userStatistics, retrievedTasksByDate }) {

  let filteredTasksBasedOnStatus = userTasks.filter(t => t.status == "Ongoing");

  if(filteredTasksBasedOnStatus.length >= 4) {
    filteredTasksBasedOnStatus = filteredTasksBasedOnStatus.slice(0, 4);
  }

  return (
    <DashboardLayout>
        <Dashboard user={user} userTasks={filteredTasksBasedOnStatus} userStatisticsEntries={userStatistics}
        retrievedTasksByDate={retrievedTasksByDate} />
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
   let userTasks = [];
   let userStatistics = [];
   let userTaskStatistics = {};
   let retrievedTasksByDate = [];

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

  await getUserTaskByDate({ token, date: '2023-05-15' })
  .then(res => {
    retrievedTasksByDate = res;
  });

   return {
      props: {
        user: username,
        userTasks: userTasks,
        userStatistics: userTaskStatistics,
      }
   }
};
