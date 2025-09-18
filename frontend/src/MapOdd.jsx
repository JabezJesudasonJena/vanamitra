import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapOd.css'; // Make sure this CSS file is in the same folder

// A new component to display the insights from the backend
function InsightsPanel({ insights, loading }) {
  if (loading) {
    return <div className="insights-panel">Loading insights...</div>;
  }

  if (!insights) {
    return null; // Don't show anything if there are no insights yet
  }

  return (
    <div className="insights-panel">
      <h4>Analysis of Current View</h4>
      <p><strong>{insights.key_insight}</strong></p>
      <div className="stats-grid">
        <div>
          <strong>Total Claims Visible:</strong>
          <span>{insights.total_claims}</span>
        </div>
        {/* Dynamically create rows for each status */}
        {Object.entries(insights.status_breakdown).map(([status, data]) => (
          <div key={status}>
            <strong>{status.charAt(0).toUpperCase() + status.slice(1)}:</strong>
            <span className={`status-${status}`}>
              {data.count} ({data.percentage}%)
            </span>
          </div>
        ))}
      </div>
       <h5>Area Analysis</h5>
       <div className="stats-grid">
         {Object.entries(insights.area_analysis).map(([status, area]) => (
            <div key={status}>
                <strong>{status.charAt(0).toUpperCase() + status.slice(1)}:</strong>
                <span>{area}</span>
            </div>
         ))}
       </div>
    </div>
  );
}


// A new component that listens to map events
function MapEvents({ onBoundsChange }) {
  const map = useMapEvents({
    // This event fires whenever the map stops moving or zooming
    moveend: () => {
      const bounds = map.getBounds();
      onBoundsChange({
        south: bounds.getSouth(),
        west: bounds.getWest(),
        north: bounds.getNorth(),
        east: bounds.getEast(),
      });
    },
  });
  return null;
}

function MapOdd() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  useEffect(() => {
    fetch("./concise_file_with_status.geojson")
      .then(response => response.json())
      .then(data => {
        setGeoJsonData(data);
      })
      .catch(error => console.error('Error fetching GeoJSON data:', error));
  }, []);
  
  // This function is called by MapEvents whenever the view changes.
  // It uses useCallback to prevent re-creating the function on every render.
  const handleBoundsChange = useCallback((bounds) => {
    setIsLoadingInsights(true);
    // Fetch insights from your local backend server
    fetch("http://127.0.0.1:8000/get-insights", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bounds),
    })
      .then(response => response.json())
      .then(data => {
        setInsights(data);
        console.log('Fetched insights:', data);
        setIsLoadingInsights(false);
      })
      .catch(error => {
        console.error('Error fetching insights:', error);
        setIsLoadingInsights(false);
      });
  }, []);


  const styleByStatus = (feature) => {
    // ... (same style function as before)
    switch (feature.properties.status) {
        case 'claimed': return { fillColor: '#28a745', weight: 2, color: 'white', fillOpacity: 0.6 };
        case 'in-process': return { fillColor: '#ffc107', weight: 2, color: 'black', fillOpacity: 0.6 };
        case 'unclaimed': return { fillColor: '#dc3545', weight: 2, color: 'white', fillOpacity: 0.6 };
        default: return { fillColor: '#6c757d', weight: 2, color: 'white', fillOpacity: 0.5 };
    }
  };
  
  const onEachFeature = (feature, layer) => {
    // ... (same onEachFeature function as before)
    if (feature.properties) {
        const placeName = feature.properties.NAME;
        if (placeName) {
            layer.bindTooltip(placeName, { permanent: true, direction: "center", className: "label-text" });
        }
        layer.on('click', () => {
            const props = feature.properties;
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
          center={[20.5937, 85.9629]}
          zoom={7}
          style={{ height: '100vh', width: '100%' }}
        >
          <InsightsPanel insights={insights} loading={isLoadingInsights} />
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri'
          />
          <GeoJSON
            data={geoJsonData}
            style={styleByStatus}
            onEachFeature={onEachFeature}
          />
          <MapEvents onBoundsChange={handleBoundsChange} />
        </MapContainer>
      ) : (
        <div className="loading-screen">Loading Map Data...</div>
      )}
    </div>
  );
}

export default MapOdd;
