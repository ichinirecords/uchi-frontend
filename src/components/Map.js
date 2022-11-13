import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup,} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import ArtPopup from "./ArtPopup"
import LeafletControlGeocoder from "./LeafletControlGeocoder";
import "./Map.css"

const Map = ({ approvedArtwork }) => {
  const position = [41, 0];
  const [clusterKey, setClusterKey] = useState(Math.random());

  useEffect(() => {
	  setClusterKey(Math.random())
  }, [approvedArtwork])

  const filteredArtwork = approvedArtwork.filter(item => item.lat);

  const redOptions = { color: "red" };

  return (
    <MapContainer
      center={position}
      zoom={2}
      className="main-map"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
      />
      <LeafletControlGeocoder setCoordUploadForm={false} currentcolor={"red"} />
      <MarkerClusterGroup showCoverageOnHover={false} key={clusterKey}>
        {filteredArtwork.map((el) => (
          <CircleMarker
            key={el.id}
            pathOptions={redOptions}
            radius={5}
            center={[el.lat, el.lon]}
          >
            <Popup>
              <ArtPopup {...el} />
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;