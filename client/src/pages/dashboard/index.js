import React, { useState, useEffect } from 'react'
import DashboardLayout from '../layout';
import Dashboard from '@/components/Dashboard/Dashboard';
import { getCookie } from 'cookies-next'
import { getUserTask, getUserTaskStatistics } from '../api/userTaskApi';

export default function DashboardPage({ user, userTasks, userStatistics }) {

  let filteredTasksBasedOnStatus = userTasks.filter(t => t.status == "Pending");

  if(filteredTasksBasedOnStatus.length >= 4) {
    filteredTasksBasedOnStatus = filteredTasksBasedOnStatus.slice(0, 4);
  }

  return (
    <DashboardLayout>
        <Dashboard user={user} userTasks={filteredTasksBasedOnStatus} userStatisticsEntries={userStatistics}/>
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
            destination: "/401",
          },
          props:{},
        }
   }


   // get user task
   let userTasks = [];
   let userStatistics = [];
   let userTaskStatistics = {};

   await getUserTask({ token })
   .then(res => {
    userTasks = res;
   });

   await getUserTaskStatistics({ token })
   .then(res => {
      userStatistics = res;
      userTaskStatistics = { "Pending": (userStatistics.Pending == undefined) ? 0 : userStatistics.Pending, 
      "Completed": (userStatistics.Completed == undefined) ? 0 : userStatistics.Completed};
   });

   return {
      props: {
        user: username,
        userTasks: userTasks,
        userStatistics: userTaskStatistics,
      }
   }
};
