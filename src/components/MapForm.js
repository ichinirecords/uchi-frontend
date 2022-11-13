import { MapContainer, TileLayer } from "react-leaflet";
import "./MapForm.css";
import LeafletControlGeocoder from "./LeafletControlGeocoder"

const MapForm = ({ setCoordUploadForm }) => {
  const position = [51.505, -0.09];

  return (
    <MapContainer center={position} zoom={13} className="form-map">
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletControlGeocoder
        setCoordUploadForm={setCoordUploadForm}
      />
    </MapContainer>
  );
};

export default MapForm;
