import React from 'react'
import DashboardLayout from '../layout';
import Dashboard from '@/components/Dashboard/Dashboard';
import { getCookie } from 'cookies-next'
import { getUserTask, getUserTaskStatistics } from '../api/userTaskApi';

export default function DashboardPage({ user, userTasks, userStatistics }) {

  let filteredTasksBasedOnStatus = userTasks.filter(t => t.status == "Pending");

  if(filteredTasksBasedOnStatus.length >= 3) {
    filteredTasksBasedOnStatus = filteredTasksBasedOnStatus.slice(0, 3);
  }

  // convert statistics to an array of objects
  const userStatisticsEntries = Object.entries(userStatistics);

  return (
    <DashboardLayout>
        <Dashboard user={user} userTasks={filteredTasksBasedOnStatus} userStatisticsEntries={userStatisticsEntries}/>
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

   await getUserTask({ token })
   .then(res => {
    userTasks = res;
   });

   await getUserTaskStatistics({ token })
   .then(res => {
      userStatistics = res;
   });

   return {
      props: {
        user: username,
        userTasks: userTasks,
        userStatistics: userStatistics,
      }
   }
};
