import React from 'react'
import DashboardLayout from '../layout';
import Dashboard from '@/components/Dashboard/Dashboard';
import { getCookie } from 'cookies-next'

export default function DashboardPage({ user }) {
  return (
    <DashboardLayout>
        <Dashboard user={user} />
    </DashboardLayout>
  )
}

export const getServerSideProps = ({ req, res }) => {

   const option = { req, res};
   const token = getCookie("USER_AUTH_TOKEN", option);
   const username = getCookie("USER_AUTH_USERNAME", option);

   if(token === null || token === "") {
        return {
          redirect: {
            permanent: false,
            destination: "/401",
          },
          props:{},
        }
   }

   return {
      props: {
        user: username,
      }
   }
};
