import axios from "axios";

export const userAuthenticationHandler = async ({ email, password }) => {
    try {
        const res = axios.post("https://localhost:7136/api/applicationuser/authenticate", {
            email: email,
            password: password
         },{ headers: {'Content-Type': 'application/json'}});
      
         const { data } = await res;
         return data;
    } 
    catch (error) {
        alert("oops! something went wrong");
    }
};

export const userRegisterationHandler = async ({ username, email, password }) => {
    try {
        const res = axios.post("https://localhost:7136/api/applicationuser/register", {
            username: username,
            email: email,
            password: password,
            dateJoined: "date",
         },{ headers: {'Content-Type': 'application/json'}});

         const { data } = await res;
         return data;
    } catch (error) {
        alert("oops! something went wrong");
    }
};