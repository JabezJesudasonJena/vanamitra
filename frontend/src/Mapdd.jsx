// MapOd.jsx
import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapStyles.css"; // Move your custom CSS there

// Panel showing summary insights
function InsightsPanel({ insights, loading }) {
  if (loading) {
    return <div className="insights-panel">Loading insights...</div>;
  }
  if (!insights) return null;

  return (
    <div className="insights-panel">
      <h4>Analysis of Current View</h4>
      <p>
        <strong>{insights.key_insight}</strong>
      </p>
      <div className="stats-grid">
        <div>
          <strong>Total Claims Visible:</strong>
          <span>{insights.total_claims}</span>
        </div>
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

// Track map bounds change
function MapEvents({ onBoundsChange }) {
  useMapEvents({
    moveend: (e) => {
      const bounds = e.target.getBounds();
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

// Main Map Component
export default function Mapdd() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  // Load GeoJSON once
  useEffect(() => {
    fetch("./concise_file_with_status.geojson")
      .then((res) => res.json())
      .then(setGeoJsonData)
      .catch((err) => console.error("Error fetching GeoJSON data:", err));
  }, []);

  // Handle bounds change
  const handleBoundsChange = useCallback((bounds) => {
    setIsLoadingInsights(true);
    //fetch("http://127.0.0.1:8000/get-insights", {
    fetch("https://vanamitra-backend.onrender.com/get-insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bounds),
    })
      .then((res) => res.json())
      .then((data) => {
        setInsights(data);
        setIsLoadingInsights(false);
      })
      .catch((err) => {
        console.error("Error fetching insights:", err);
        setIsLoadingInsights(false);
      });
  }, []);

  // Style polygons by status
  const styleByStatus = (feature) => {
    switch (feature.properties.status) {
      case "claimed":
        return {
          fillColor: "#28a745",
          weight: 2,
          color: "white",
          fillOpacity: 0.6,
        };
      case "in-process":
        return {
          fillColor: "#ffc107",
          weight: 2,
          color: "black",
          fillOpacity: 0.6,
        };
      case "unclaimed":
        return {
          fillColor: "#dc3545",
          weight: 2,
          color: "white",
          fillOpacity: 0.6,
        };
      default:
        return {
          fillColor: "#6c757d",
          weight: 2,
          color: "white",
          fillOpacity: 0.5,
        };
    }
  };

  // Per feature actions
  const onEachFeature = (feature, layer) => {
    if (!feature.properties) return;

    const placeName = feature.properties.NAME;
    if (placeName) {
      layer.bindTooltip(placeName, {
        permanent: true,
        direction: "center",
        className: "label-text",
      });
    }

    layer.on("click", () => {
      const props = feature.properties;
      const uniqueId = props.CEN_2001 || props.NAME.replace(/\s/g, "");
      const baseContent = `
        <h3>${props.NAME || "N/A"}</h3>
        <p><strong>District:</strong> ${props.DISTRICT || "N/A"}</p>
        <p><strong>Status:</strong> <span class="status-${props.status}">
            ${props.status || "N/A"}
        </span></p>
        <button id="analyze-btn-${uniqueId}" class="analysis-button">
          Analyze Historical Potential
        </button>
        <div id="analysis-result-${uniqueId}"></div>
      `;
      layer.bindPopup(baseContent, { minWidth: 280 }).openPopup();
    });

    // Attach analysis button handler
    layer.on("popupopen", () => {
      const props = feature.properties;
      const uniqueId = props.CEN_2001 || props.NAME.replace(/\s/g, "");
      const analyzeBtn = document.getElementById(`analyze-btn-${uniqueId}`);

      if (analyzeBtn) {
        analyzeBtn.onclick = () => {
          const resultDiv = document.getElementById(
            `analysis-result-${uniqueId}`
          );
          resultDiv.innerHTML =
            "<p><em>Analyzing historical satellite data...</em></p>";
          analyzeBtn.disabled = true;

          fetch("http://127.0.0.1:8000/analyze-potential-area", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feature),
          })
            .then((res) => res.json())
            .then((data) => {
              resultDiv.innerHTML = `
                <div class="analysis-result">
                  <h5>AI Analysis Result</h5>
                  <p><strong>Potential Score:</strong> ${data.potential_score}</p>
                  <p>${data.analysis_summary}</p>
                  <div class="timeline-images">
                    <img src="${data.image_timeline[0]}" alt="Historical View 1"/>
                    <img src="${data.image_timeline[1]}" alt="Historical View 2"/>
                    <img src="${data.image_timeline[2]}" alt="Current View"/>
                  </div>
                </div>
              `;
            })
            .catch((err) => {
              console.error("Error fetching analysis:", err);
              resultDiv.innerHTML =
                "<p style='color:red;'><em>Analysis failed. Please try again.</em></p>";
              analyzeBtn.disabled = false;
            });
        };
      }
    });
  };

  return (
    <div className="App">
      {geoJsonData ? (
        <MapContainer
          center={[20.5937, 85.9629]}
          zoom={7}
          style={{ height: "100vh", width: "100%" }}
        >
          <InsightsPanel insights={insights} loading={isLoadingInsights} />
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="&copy; Esri"
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
