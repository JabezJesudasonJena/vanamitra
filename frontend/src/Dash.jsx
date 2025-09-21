import "./Dash.css";
// MapOd.jsx
import React, { useEffect, useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapStyles.css"; // Move your custom CSS there

const runAnalysis = () => {
  if (!selectedFeature) return;
  setIsAnalyzing(true);
  setAnalysisResult(null);

  fetch("https://vanamitra-backend.onrender.com/analyze-potential-area", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedFeature),
  })
    .then((res) => res.json())
    .then((data) => {
      setAnalysisResult(data);
      setIsAnalyzing(false);
    })
    .catch((err) => {
      console.error("Error fetching analysis:", err);
      setAnalysisResult({ error: "Analysis failed. Please try again." });
      setIsAnalyzing(false);
    });
};


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
/*
const handleSearch = () => {
  if (!geoJsonData || !searchQuery.trim()) return;

  // find by NAME (case insensitive)
  const feature = geoJsonData.features.find(f =>
    f.properties.NAME?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (feature && mapRef.current) {
    const layer = L.geoJSON(feature);
    mapRef.current.fitBounds(layer.getBounds());

    // Temporary highlight effect
    layer.setStyle({ color: "blue", weight: 4 });
    setTimeout(() => {
      layer.setStyle(styleByStatus(feature));
    }, 3000);
  } else {
    alert("No matching claim/village found");
  }
};


*/
const Dash = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const mapRef = useRef();


    const [geoJsonData, setGeoJsonData] = useState(null);
    const [insights, setInsights] = useState(null);
    const [isLoadingInsights, setIsLoadingInsights] = useState(false);

    const [selectedFeature, setSelectedFeature] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSearch = () => {
  if (!geoJsonData || !searchQuery.trim()) return;

  // find by NAME (case insensitive)
  const feature = geoJsonData.features.find(f =>
    f.properties.NAME?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (feature && mapRef.current) {
    const layer = L.geoJSON(feature);
    mapRef.current.fitBounds(layer.getBounds());

    // Temporary highlight effect
    layer.setStyle({ color: "blue", weight: 4 });
    setTimeout(() => {
      layer.setStyle(styleByStatus(feature));
    }, 3000);
  } else {
    alert("No matching claim/village found");
  }
};
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
        setSelectedFeature(feature);
        setAnalysisResult(null);
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

          fetch("https://vanamitra-backend.onrender.com/analyze-potential-area", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feature),
          })
            .then((res) => res.json())
            .then((data) => {
                setAnalysisResult(data);
                setIsAnalyzing(false);
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
              setAnalysisResult({ error: "Analysis failed. Please try again." });
+               setIsAnalyzing(false);
            });
            setSelectedFeature(feature); 
            setAnalysisResult(null); 
            setIsAnalyzing(true); 
        };
      }
    });
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <svg
              className="logo-icon"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h1 className="title">VANAMITRA</h1>
        </div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/map">FRA Atlas</a>
          <a href="#" className="active">
            Claims
          </a>
          <a href="#">DSS</a>
          <a href="#">Resources</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </nav>
        <div className="header-right">
          <button className="icon-btn">🔔</button>
          <div
            className="avatar"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAqoIGVlTMCpy2wkn4lpnnqKf8DBt3biJIlSpKl0HaVKigg6q_p5i4FThnUvpcRykoyQDuh23FNW81AKlzp5B33KQMbTl9VTj4Gqxkw2-l_oRr2u-VVyTr5MJGLOE6VzneG7qnM68S0QtfYQ2uqmL6Dh8RNoIqF9tCNm-h1L9xWJMbQwtPRMXd_O3QedqElVNxE4ApLt29pleW95NoscyINZuQxR2unuM4snDyh2fC2WulgS2dc3OwObeCYuxp9_4za4Jiah-XhU2s")`,
            }}
          ></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Sidebar Filters */}
        <aside className="sidebar">
  <div className="filter-card">
    <h2>Filters</h2>
    {/* your existing filters here */}
  

  <div className="analysis-card">
    <h2>AI Analysis</h2>
    {!selectedFeature && <p>Select a claim on the map to analyze.</p>}
    
    {selectedFeature && !analysisResult && !isAnalyzing && (
      <button onClick={runAnalysis} className="analyze-btn">
        Analyze {selectedFeature.properties.NAME}
      </button>
    )}

    {isAnalyzing && <p><em>Analyzing historical satellite data...</em></p>}

    {analysisResult && !analysisResult.error && (
      <div className="analysis-result">
        <h4>Result for {selectedFeature.properties.NAME}</h4>
        <p><strong>Potential Score:</strong> {analysisResult.potential_score}</p>
        <p>{analysisResult.analysis_summary}</p>
        <div className="timeline-images">
          {analysisResult.image_timeline?.map((img, idx) => (
            <img key={idx} src={img} alt={`View ${idx + 1}`} />
          ))}
        </div>
      </div>
    )}

    {analysisResult?.error && (
      <p style={{ color: "red" }}>{analysisResult.error}</p>
    )}
  </div>
  </div>
</aside>


        {/* Right Section */}
        <section className="content">
          {/* Search */}
          <div className="search-bar">
            <input
                type="text"
                placeholder="Search for a claim, village, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {/* Map */}
          <div className="map-container">
            <div className="App">
                  {geoJsonData ? (
                    <MapContainer
                      center={[20.5937, 84.8629]}
                      zoom={7}
                      style={{ height: "100vh", width: "100%" }}
                      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
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
          </div>

          {/* Claim Card */}
          <div className="claim-card">
            <div
              className="claim-img"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBQYaWBT6ePCiZE_iDANFOXqOHlnr4qhQ51MXiI55ewzP5N3bgX2ehO5fUpvVtELBGfcz269-7k8kTFDe3L6bDljn0rPVqMoUm4P5_3pA0yQNtAWBgVSA_cMOOdxTR2PJ6H70HI-HyrnhSG7WYR-3tZmS06UhpLgCsMGVTNJtIwIKN--c0lzyBElSWXyokd3bI9z7DYpaBduBhPyFExlUEQJOF5NEwirrD6U0ptnDFafSOJKbUIRgqMZc3f9eUZ2nbBd4bxODsA4OZi")',
              }}
            ></div>
            <div className="claim-info">
              <h3>Claiman </h3>
              <p>Authenticity Score: <span className="highlight">85%</span></p>
              <p>Livelihood Impact: <span className="highlight">High</span></p>
            </div>
            <button className="view-btn">View Details</button>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat-box">
              <p>Total Claims Digitized</p>
              <h3>100</h3>
            </div>
            <div className="stat-box">
              <p>Villages Covered</p>
              <h3>100</h3>
            </div>
            <div className="stat-box">
              <p>Tribal Households Benefited</p>
              <h3>300+</h3>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dash;
