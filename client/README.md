# Client 
- [Client](#client)
  - [Client pages](#client-pages)
    - [`HomePage`](#homepage)
    - [`EventInfo`](#eventinfo)
  - [Client components](#client-components)
    - [`Map`](#map)
    - [`EventCard`](#eventcard)
    - [`ConfirmationAlert`](#confirmationalert)
    - [`SuccessfulAlert`](#successfulalert)

## Client pages
### `HomePage`
.....

### `EventInfo`
It receives a route object as a prop.  
Inside the component, it initializes several state variables using the useState hook. It also has an effect hook that fetches event data and updates the component state. 

The component renders a view with event information, including the event title, description, date, minimum level required, and location.  
It also renders a button to join the event, which triggers a function called joinEvent. 

>If the user has already joined the event, a warning message is displayed. Additionally, there is a confirmation alert that prompts the user to confirm their intention to join the event.

## Client components
### `Map`
This code snippet exports a React component called Map that renders a map view using Leaflet, a popular mapping library in JavaScript. 

The component takes in latitude and longitude as props and uses them to set the center of the map. It also sets a custom icon for a marker on the map, but that part is currently commented out. 

The map is displayed inside a container with a fixed height and rounded appearance.  
It uses an OpenStreetMap tile layer as the base layer and adds a marker at the specified coordinates with a popup. The MapView function is a helper function that initializes the map view and sets the view to the specified coordinates and zoom level.

### `EventCard`
It renders a card of the event with a title, a date, the status, some content and a button to see the event details.

The `onView` function is called when the corresponding button is pressed. The expDate prop specifies the expiration date of the event while the content prop is an object having location, time and level as properties that are displayed in the card body

### `EventList`
It renders a list of EventCard.

The `updateUserEvents` function is passed to the EventInfoPage to update the list of user events when a user joins an event

### `ConfirmationAlert`
It renders a modal with a title, message, and two buttons: one for confirming the operation and another for canceling it. 

The `onConfirm` and `onCancel` functions are called when the corresponding buttons are pressed. The operation prop specifies the text to display on the confirmation button.

### `SuccessfulAlert`
 It is a modal component that displays a message and a "Close" button.  
 The component takes two props: `message` (the text to be displayed) and `onCancel` (a function to be called when the modal is closed). 
 
 The `Modal` component is used to create the modal overlay, and the Alert.alert function is used to display a message when the modal is closed. The `Pressable` component is used to create the "Close" button, and the `onPress` prop is used to specify the function to be called when the button is pressed.