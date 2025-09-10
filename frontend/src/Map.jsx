import './map-sty.css'
import { MapContainer, Marker, TileLayer, Marker } from 'react-leaflet'
import "leaflet/dist/leaflet.css"



const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: "Hello, I am pop up 1"
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
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
            attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribxutors'
            url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(marker => (
          <Marker position={marker.geocode}>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
