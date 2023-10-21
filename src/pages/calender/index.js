import React from 'react';
import DashboardLayout from '../layout';
import Calender from '@/components/Calender/Calender';
import { getCookie } from "cookies-next";

import { getUserTask } from '../api/userTaskApi';

export default function CalenderPage({ userTasks }) {
  return (
    <DashboardLayout>
        <Calender userTasks={userTasks} />
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

  await getUserTask({ token })
  .then(res => {
   userTasks = res;
  });

  return {
     props: {
       userTasks: userTasks,
     }
  }
};

