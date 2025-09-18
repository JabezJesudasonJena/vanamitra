import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//import { data } from 'react-router-dom';


function MapOd() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    //fetch('./or1.geojson')
    fetch("./or1.geojson")
      .then(response => response.json())
      .then(data => {   
        setGeoJsonData(data);
        //console.log(data)
      })
      // console.log(data)

      .catch(error => console.error('Error fetching GeoJSON data:', error));
  }, []);

  // Style for the GeoJSON polygons
  const geoJsonStyle = {
    fillColor: 'lightblue',
    weight: 2,
    color: 'blue',
    fillOpacity: 0.5,
  };

  return (
    <div className="App">
      {geoJsonData ? (
        <MapContainer 
          center={[20.2, 85.1]} // Initial center of the map
          zoom={9}             // Initial zoom level
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; Esri &mdash; source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
          <GeoJSON 
                data={geoJsonData} 
                style={geoJsonStyle} 
                onEachFeature={(features, layer) => {
                    if (features.properties) {
                        const placeName = features.properties.NAME || features.properties.DISTRICT;
                        // console.log(placeName); 
                        layer.bindTooltip(placeName, {
                        permanent: true,
                        direction: "center",
                        className: "label-text"
      });
                    }
                }}
                    />
        </MapContainer>
      ) : (
        <div>Loading map...</div>
      )}
    </div>
  );
}

export default MapOd;