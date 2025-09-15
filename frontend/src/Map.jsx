import './map-sty.css'
import { MapContainer, Marker, TileLayer, Popup} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import MakerClusterGroup from "react-leaflet-markercluster"

// In the orginal code the API call will be done and the data will be extracted from the web
const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: "This  is the note of the pin 1"
  },
  {
    geocode: [48.85, 2.3522],
    popUp: "Hello, I am pop up 2"
  },
  {
    geocode: [48.855, 2.34],
    popUp: "Hello, I am pop up 3"
  }
];

function Map() {
  return (
    <div>
      <MapContainer center={[13.091010, 79.972741]} zoom={13}>
        <TileLayer
            attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribxutors'
            url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        // This is so that the user can locate the area and add some evidences 
        <MakerClusterGroup>
          {markers.map(marker => (
            <Marker position={marker.geocode}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MakerClusterGroup>
        </MapContainer>
    </div>
  )
}

export default Map
