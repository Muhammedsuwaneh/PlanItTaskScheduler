import React from 'react';
import DashboardLayout from '../layout';
import Profile from '@/components/Profile/Profile';
import { useRouter } from 'next/router';

import { getCookie, deleteCookie } from 'cookies-next';

import { getUserInfoHandler } from '../api/auth/userAuth';

export default function ProfilePage({ user }) {

  const router = useRouter();

  const userDeletedHandler = () => {
    deleteCookie("USER_AUTH_TOKEN");
    deleteCookie("USER_AUTH_USERNAME");
    router.push("/");
  };

  return (
    <DashboardLayout>
        <Profile user={user} onUserAccountDelete={userDeletedHandler}/>
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
           destination: "/404",
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