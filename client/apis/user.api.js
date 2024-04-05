'use strict';
import SERVER_URL from "../utils/connection";

const getUserEvents = async (userId) => {
    try {
        const response = await fetch(SERVER_URL + `/users/${userId}/events`);
        console.log(response)
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const message = await response.text();
            throw new Error("Application message1: " + message);
        }
    } catch (error) {
        console.error(error)
        throw new Error("Network error1: " + error.message);
    }

}

const getUserCreatedEvents = async (userId) => {
    try {
        const response = await fetch(SERVER_URL + `/users/${userId}/createdEvents`);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const message = await response.text();
            throw new Error("Application message2: " + message);
        }
    } catch (error) {
        console.error(error)
        throw new Error("Network error2: " + error.message);
    }

}

const getUser = async (userId) => {
    try {
        const response = await fetch(SERVER_URL + `/users/${userId}`);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const message = await response.text();
            throw new Error("Application message:3 " + message);
        }
    } catch (error) {
        throw new Error("Network error: 3" + error.message);
    }

}

let USER_API = {
    getUserEvents, getUserCreatedEvents, getUser
}

export default USER_API;