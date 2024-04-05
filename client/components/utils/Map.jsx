//import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
//import React from "react";
// import icon from "../assets/map-marker.png";
// import L from "leaflet";

/*export function Map(props) {
    const { longitude, latitude } = props;

    function MapView() {
        let map = useMap();
        map.setView([latitude, longitude], map.getZoom());
        return null;
    }

    return (
        <MapContainer
            className="map"
            center={[latitude, longitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{
                height: 200, // Set the height of the map container
                padding: 16,
                aspectRatio: 1, // Maintain a square aspect ratio
                borderRadius: 8, // Optional: Add border radius for a rounded appearance
                overflow: 'hidden', // Optional: Clip overflow for rounded appearance
            }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
                <Popup>HERE</Popup>
            </Marker>
            <MapView />
        </MapContainer >
    )
}*/


// import React from 'react';
// import MapboxGL from '@react-native-mapbox-gl/maps';

// MapboxGL.setAccessToken('pk.eyJ1IjoiZmlsaXBwby1jYXN0ZSIsImEiOiJjbHJkaWFwZXcxOWQ0Mmpta3Y5djgyaXowIn0.Cjkx6wTdxnsOov3j-Qj-kQ');

// export function MapWithZoomControls(props) {
//     const { longitude, latitude } = props;

//     return (
//         <MapboxGL.MapView
//             style={{ flex: 1 }}
//             centerCoordinate={[longitude, latitude]}
//             zoomLevel={10}
//         >
//             <MapboxGL.Camera
//                 zoomLevel={10} // Set initial zoom level
//                 centerCoordinate={[longitude, latitude]}
//             />

//             <MapboxGL.UserLocation />

//             <MapboxGL.ZoomControl />

//             {/* Add other map features, layers, markers, etc. here */}
//         </MapboxGL.MapView>
//     );
// }