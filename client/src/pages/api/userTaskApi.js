const axios = require('axios').default;
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});


export const getUserTask = async({ token }) => {
    const response = await axios.get("https://localhost:7136/api/usertasks/",
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
}

export const getUserTaskStatistics = async ({ token }) => {
    const response = await axios.get("https://localhost:7136/api/usertasks/statistics",
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