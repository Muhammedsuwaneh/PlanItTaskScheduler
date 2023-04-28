const axios = require('axios').default;
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

export const userAuthenticationHandler = async ({ email, password }) => {
    return axios.post("https://localhost:7136/api/applicationuser/authenticate", {
        email: email,
        password: password
    },{ headers: {'Content-Type': 'application/json'}});
};

export const userRegisterationHandler = async ({ username, email, password }) => {
    try {
        const res = axios.post("https://localhost:7136/api/applicationuser/register", {
            username: username,
            email: email,
            password: password,
            dateJoined: "date",
         },{ headers: {'Content-Type': 'application/json'}});

         return res;
    } catch (error) {
        return error;
    }
};

export const updateUserInfoRequest = async ({ updatedUser, token }) => {
    try {
        const response = await fetch("https://localhost:7136/api/applicationuser/update", { 
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
    const response = await axios.get("https://localhost:7136/api/applicationuser/user",
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