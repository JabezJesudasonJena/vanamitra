import './map-sty.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

function Map() {
  return (
    <div>
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
            attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribxutors'
            url = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}

export default Map
