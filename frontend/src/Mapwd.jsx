import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw"; // plugin

const Mapwd = () => {
  const mapRef = useRef();

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // FeatureGroup is to store editable layers
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Add draw control
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polygon: true,
        rectangle: true,
        circle: false,
        circlemarker: false,
        marker: true,
        polyline: false,
      },
    });
    map.addControl(drawControl);

    // On shape creation
    map.on(L.Draw.Event.CREATED, function (e) {
      const { layer } = e;
      drawnItems.addLayer(layer);

      // Convert to GeoJSON for saving in DB
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
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
    </MapContainer>
  );
};

export default Mapwd;
