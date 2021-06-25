import { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// https://github.com/PaulLeCam/react-leaflet/issues/453
//--
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;
//--

const BusStopMap = ({ busStopFeature }) => {
  // https://stackoverflow.com/questions/66593794/display-new-geojson-data-for-geojson-class-on-click-of-button

  // get a ref to the underlying L.geoJSON
  const geoJSONRef = useRef();

  // set the data to new data whenever it changes
  useEffect(() => {
    if (geoJSONRef.current) {
      geoJSONRef.current.clearLayers(); // remove old data
      geoJSONRef.current.addData(busStopFeature); // might need to be geojson.features
    }
  }, [geoJSONRef, busStopFeature]);

  const pathColor = "red";

  return (
    <div className="map">
      <MapContainer
        center={[41.394458, 2.158904]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: 400 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {busStopFeature && (
          <GeoJSON
            pathOptions={{ color: pathColor, weight: 5 }}
            ref={geoJSONRef}
            data={busStopFeature}
          />
          // <Marker position={[41.394458, 2.158904]}>
          //   <Popup>
          //     A pretty CSS3 popup. <br /> Easily customizable.
          //   </Popup>
          // </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default BusStopMap;
