import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";


// Import CSS
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Import plugin
import {EditControl, FeatureGroup} from "leaflet-draw";

const Mapd = () => {
    /*
    var map = L.map('map').setView([20.9517, 85.0985], 7); // Centered on Odisha

    var drawnControl = new L.Control.Draw({});
    map.drawnControl(drawnControl);

    */

    return (
        <MapContainer
            center={[20.9517, 85.0985]} // Odisha
            zoom={7}
            style={{ height: "100vh", width: "100%" }}
             whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
         }}
         

        >
            <FeatureGroup>
                <EditControl position="topRight">

                </EditControl>
            </FeatureGroup>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
        />
    </MapContainer>
    )
}

export default Mapd