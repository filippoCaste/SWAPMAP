import SERVER_URL from "../utils/connection";

const getAllTopics = async () => {
    try {
        const response = await fetch(SERVER_URL + "/topics");
        if (response.ok) {
            const topics = await response.json();
            return topics;
        } else {
            const message = await response.text();
            throw new Error("Application message: " + message);
        }
    } catch (error) {
        console.error(error)
        throw new Error("Network error: " + error.message);
    }
}

const getUserTopics = async (userId) => {
    try {
        const response = await fetch(SERVER_URL + "/topics/" + userId);
        if (response.ok) {
            const topics = await response.json();
            return topics;
        } else {
            const message = await response.text();
            throw new Error("Application message: " + message);
        }
    } catch (error) {
        console.error(error)
        throw new Error("Network error: " + error.message);
    }
}

const TOPICS_API = {
    getAllTopics, getUserTopics
}

export default TOPICS_API;