import SERVER_URL from "../utils/connection";

const getStuff = async () => {
  const response = await fetch(SERVER_URL + "/");
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return result;
  } else {
    return "error";
  }
};

/**
 * Retrieves all the questions (and answers) of a questionnaire given its topicId
 *
 * @return {Promise} A promise that resolves to the array of questions (and answers).
 * @throws {Error} If there is a network error or if the server returns an error message.
 */
const getQuestionnaire = async (topicId) => {
  try {
    const response = await fetch(SERVER_URL + "/questionnaire/" + topicId, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const message = await response.text();
      throw new Error("Application message: " + message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Network error: " + error.message);
  }
};

const addExperience = async (user_id, topicId, experience) => {
  try {
    const response = await fetch(SERVER_URL + "/questionnaire/" + user_id, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topicId, experience }),
    });

    if (response.ok) {
      const result = await response.json();
      return result.experience;
    } else {
      return "error";
    }
  } catch (error) {
    console.error(error);
    throw new Error("Network error: " + error.message);
  }
};

let QUESTIONNAIRE_API = {
  getStuff,
  getQuestionnaire,
  addExperience,
};

export default QUESTIONNAIRE_API;
