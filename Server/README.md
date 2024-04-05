# Server endpoints

- [Server endpoints](#server-endpoints)
  - [`/api/events`:](#apievents)
  - [`/api/users`](#apiusers)
  - [...](#)

## `/api/events`:

- GET `/`:
  - returns all the events in the json format
  - ...
- GET `/<event_id>`:
  - returns information (the details -- activity, category, event description) based on the event id on the uri
  - Returns:
    - 200: for successful operation
    - 404: if the resource is not found
    - 500: for internal server errors
- POST `/<event_id>/join/<user_id>`
  - api to join an event.
  - Returns:
    - 200: success
    - 404: event id or user id do not exist
    - 500: internal server error

## `/api/users`

- GET `/<user_id>/events`
  - returns all the events of a given user
  - Returns:
    - 200: in case of success
    - 500: internal server error

## ...
