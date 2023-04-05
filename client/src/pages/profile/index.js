import React from 'react';
import DashboardLayout from '../layout';
import Profile from '@/components/Profile/Profile';

import { getCookie } from 'cookies-next';

import { getUserInfoHandler } from '../api/auth/userAuth';

export default function ProfilePage({ user }) {
  return (
    <DashboardLayout>
        <Profile user={user}/>
    </DashboardLayout>
  )
}

export const getServerSideProps = async ({ req, res }) => {
    
  const option = { req, res};
  const token = getCookie("USER_AUTH_TOKEN", option);

  if(token == null || token == ""  || token == undefined) {
       return {
         redirect: {
           permanent: false,
           destination: "/401",
         },
         props:{},
       }
  }

  let user = {};
  await getUserInfoHandler({ token })
  .then(res => {
    user = res;
  });

  return {
    props: {
      user: user
    }
  }
}