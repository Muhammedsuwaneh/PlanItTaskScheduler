const axios = require('axios').default;
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

import { getBaseURL } from '../userTaskApi';

export const userAuthenticationHandler = ({ email, password }) => {
    return axios.post(`${getBaseURL()}/applicationuser/authenticate`, {
        email: email,
        password: password
    },{ headers: {'Content-Type': 'application/json'}});
};

export const userRegisterationHandler = ({ username, email, password }) => {
        return axios.post(`${getBaseURL()}/applicationuser/register`, {
            username: username,
            email: email,
            password: password,
            dateJoined: "date",
         },{ headers: {'Content-Type': 'application/json'}});
};

export const updateUserInfoRequest = async ({ updatedUser, token }) => {
    try {
        const response = await fetch(`${getBaseURL()}/applicationuser/update`, { 
            httpsAgent: agent,
            method: "PUT",
            mode: 'cors',
            body: JSON.stringify(updatedUser),
            withCredentials: true,
            credentials: 'same-origin',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
         });

         return response.json(); 
    } catch (error) {
        return "oops something went wrong: " + error;
    }
};

export const getUserInfoHandler = async ({ token }) => {
    const response = await axios.get(`${getBaseURL()}/applicationuser/user`,
    {
        httpsAgent: agent,
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if(response.data == undefined || response.data == null || response.data == '') {
        throw new Error("Something went wrong!");
    }

    const data = response.data;
    const { responseObject } = data;

    return responseObject;  
};