import React from 'react'
import DashboardLayout from '../layout';
import Dashboard from '@/components/Dashboard/Dashboard';
import { getCookie } from 'cookies-next'
import { getUserTask } from '../api/getUserTask';

const months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
};

export default function DashboardPage({ user, userTasks }) {

  let filteredTasksBasedOnStatus = userTasks.filter(t => t.status == "Pending");

  if(filteredTasksBasedOnStatus.length >= 3) {
    filteredTasksBasedOnStatus = filteredTasksBasedOnStatus.slice(0, 3);
  }

  return (
    <DashboardLayout>
        <Dashboard user={user} userTasks={filteredTasksBasedOnStatus} />
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
   let obj = ['g'];

   await getUserTask({ token })
   .then(res => {
      obj = res;
   });

   return {
      props: {
        user: username,
        userTasks: obj,
      }
   }
};
