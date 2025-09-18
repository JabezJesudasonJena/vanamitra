import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapOd.css'; // You'll need this CSS file for styling

function MapOd() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Fetching the GeoJSON data you provided
    fetch("./concise_file_with_status.geojson")
      .then(response => response.json())
      .then(data => {
        setGeoJsonData(data);
      })
      .catch(error => console.error('Error fetching GeoJSON data:', error));
  }, []);

  // This function styles each area based on its "status" property
  const styleByStatus = (feature) => {
    switch (feature.properties.status) {
      case 'claimed':
        return { fillColor: '#28a745', weight: 2, color: 'white', fillOpacity: 0.6 }; // Green
      case 'in-process':
        return { fillColor: '#ffc107', weight: 2, color: 'black', fillOpacity: 0.6 }; // Yellow
      case 'unclaimed':
        return { fillColor: '#dc3545', weight: 2, color: 'white', fillOpacity: 0.6 }; // Red
      default:
        return { fillColor: '#6c757d', weight: 2, color: 'white', fillOpacity: 0.5 }; // Grey
    }
  };
  
  // This function runs for each feature, adding tooltips and click-to-popup events
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      // 1. Add the permanent tooltip with the place name
      const placeName = feature.properties.NAME;
      if (placeName) {
        layer.bindTooltip(placeName, {
          permanent: true,
          direction: "center",
          className: "label-text"
        });
      }

      // 2. Add the click event listener to show a popup
      layer.on('click', () => {
        const props = feature.properties;
        // Construct the HTML content for the popup
        let popupContent = `<h3>${props.NAME || 'N/A'}</h3>`;
        popupContent += `<p><strong>District:</strong> ${props.DISTRICT || 'N/A'}</p>`;
        popupContent += `<p><strong>State:</strong> ${props.STATE || 'N/A'}</p>`;
        popupContent += `<p><strong>Type:</strong> ${props.TYPE || 'N/A'}</p>`;
        popupContent += `<p><strong>Status:</strong> <span class="status-${props.status}">${props.status || 'N/A'}</span></p>`;
        
        layer.bindPopup(popupContent).openPopup();
      });
    }
  };

  return (
    <div className="App">
      {geoJsonData ? (
        <MapContainer
          center={[20.5937, 85.9629]} // Centered on Odisha
          zoom={7}                 // Zoomed out to see the whole state
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri'
          />
          <GeoJSON
            data={geoJsonData}
            style={styleByStatus}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      ) : (
        <div>Loading map...</div>
      )}
    </div>
  );
}

export default MapOd;