import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

import icon from "./constants";

const LeafletControlGeocoder = ({ setCoordUploadForm }) => {
  const map = useMap();

  useEffect(() => {
    var geocoder = L.Control.Geocoder.nominatim();
    if (typeof URLSearchParams !== "undefined" && window.location.search) {
      var params = new URLSearchParams(window.location.search);
      var geocoderString = params.get("geocoder");
      if (geocoderString && L.Control.Geocoder[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }

    L.Control.geocoder({
      query: "",
      placeholder: "Search your city here...",
      defaultMarkGeocode: false,
      geocoder,
      collapsed: false,
    })
      .on("markgeocode", function (e) {
        var latlng = e.geocode.center;
        if (setCoordUploadForm !== false) {
          const city =
            e.geocode.properties.address.city ||
            e.geocode.properties.address.village ||
            e.geocode.properties.address.hamlet ||
            e.geocode.properties.address.town ||
            e.geocode.properties.address.municipality ||
            e.geocode.properties.address.county;
          const country = e.geocode.properties.address.country;
          const lat = e.geocode.center.lat;
          const lon = e.geocode.center.lng;
          setCoordUploadForm({
            city: city,
            country: country,
            lat: lat,
            lon: lon,
          });
          L.marker(latlng, { icon })
            .addTo(map)
            .bindPopup(e.geocode.name)
            .openPopup();
        }
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);

  return null;
};

export default LeafletControlGeocoder;
