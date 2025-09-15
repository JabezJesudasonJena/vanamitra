// MapWithDraw.jsx
import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

// Import CSS
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Import plugin
import "leaflet-draw";

const Mapwd = () => {
  const mapRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Create feature group to store drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // ✅ Add draw control
    const drawControl = new L.Control.Draw({
      position: "topleft", // toolbar position
      draw: {
        polygon: true,
        rectangle: true,
        marker: true,
        polyline: false,
        circle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });
    map.addControl(drawControl);

    // ✅ Event listener
    map.on(L.Draw.Event.CREATED, (event) => {
      const { layer } = event;
      drawnItems.addLayer(layer);

      // Convert drawn shape to GeoJSON
      const geojson = layer.toGeoJSON();
      console.log("Drawn Shape:", geojson);
      alert("Shape drawn! Check console for GeoJSON.");
    });
  }, []);

  return (
    <MapContainer
      center={[20.9517, 85.0985]} // Odisha
      zoom={7}
      style={{ height: "100vh", width: "100%" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
    </MapContainer>
  );
};

export default Mapwd;
