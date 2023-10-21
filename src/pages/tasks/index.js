import React from 'react';
import DashboardLayout from '../layout';
import Tasks from '@/components/Tasks/Tasks';
import { getCookie } from "cookies-next";

import { getUserTask, getUserTaskStatistics } from '../api/userTaskApi';

export default function TasksPage({ userTasks, userStatistics }) {
  return (
    <DashboardLayout>
        <Tasks userTasks={userTasks} userStatistics={userStatistics} />
    </DashboardLayout>
  )
}

export const getServerSideProps = async({ req, res }) => {

  const option = { req, res};
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
       userTasks: userTasks,
       userStatistics: userTaskStatistics,
     }
  }
};

