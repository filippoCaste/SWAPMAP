"use strict";
import SERVER_URL from "../utils/connection";

/**
 * Retrieves all the approved events from the server.
 *
 * @return {Promise} A promise that resolves to the array of events.
 * @throws {Error} If there is a network error or if the server returns an error message.
 */
const getAllEvents = async () => {
  try {
    const response = await fetch(SERVER_URL + "/events");
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

/**
 * Retrieves the event details by its ID from the server.
 *
 * @param {string} eventId - The ID of the event to retrieve its data.
 * @return {Promise<Object>} - A promise that resolves to the event data.
 * @throws {Error} - If there is an application or network error.
 */
const getEventDetailsById = async (eventId) => {
  try {
    const response = await fetch(SERVER_URL + "/events/" + eventId, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      // example: {'id_event': 1, 'activityDescription': 'Embark on ...', 'activityTitle': 'Re-talk', 'categoryTitle': 'Talking Event'}
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

/**
 * Joins an event with the given eventId and userId.
 *
 * @param {string} eventId - The ID of the event to join.
 * @param {string} userId - The ID of the user joining the event.
 * @return {Promise<boolean>} A promise that resolves to true if the join request is successful.
 * @throws {Error} Throws an error if the join request fails.
 */
const joinEvent = async (eventId, userId) => {
  try {
    const response = await fetch(
      SERVER_URL + "/events/" + eventId + `/join/${userId}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      return true;
    } else {
      const message = await response.text();
      throw new Error("Application message: " + message);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Network error: " + error.message);
  }
};

const createEvent = async (userId, eventData) => {
  try {
    const response = await fetch(SERVER_URL + "/events/create" + `/${userId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (response.ok) {
      return true;
    } else {
      return "error";
    }
  } catch (error) {
    console.error(error);
    throw new Error("Network error: " + error.message);
  }
};

let EVENTS_API = {
  getAllEvents,
  getEventDetailsById,
  joinEvent,

  createEvent,
};

export default EVENTS_API;
