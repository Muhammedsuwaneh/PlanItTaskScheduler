const axios = require('axios').default;
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false
});

export const getBaseURL = () => `${process.env.NEXT_PUBLIC_API_URL}`;

export const getUserTask = async({ token }) => {
    const response = await axios.get(`${getBaseURL()}/usertasks/`,
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

export const getUserMonthlyTaskCount = async({ token }) => {
    const response = await axios.get(`${getBaseURL()}/usertasks/totaltaskeverymonth`,
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

export const getUserTaskByDate = async({ token, date }) => {
    const response = await axios.get(`${getBaseURL()}/usertasks/usertaskbydate/${date}`,
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

export const deleteUserTaskRequest = async ({ token, id }) => {
    const req = await fetch(`${getBaseURL()}/usertasks/delete/${+id}`,
    {
        method: "DELETE",
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

    return req.json();
};

export const updateUserTaskRequest = async ({ token, updatedTask, taskId }) => {
    const req = await fetch(`${getBaseURL()}/usertasks/update/${+taskId}`,
    {
        method: "PUT",
        mode: 'cors',
        body: JSON.stringify(updatedTask),
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

    return req.json();
};

export const getUserTaskStatistics = async ({ token }) => {
    const response = await axios.get(`${getBaseURL()}/usertasks/statistics`,
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