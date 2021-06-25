import { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MetroMap = ({ metroLineFeature }) => {
  // https://stackoverflow.com/questions/66593794/display-new-geojson-data-for-geojson-class-on-click-of-button

  // get a ref to the underlying L.geoJSON
  const geoJSONRef = useRef();

  // set the data to new data whenever it changes
  useEffect(() => {
    if (geoJSONRef.current) {
      geoJSONRef.current.clearLayers(); // remove old data
      geoJSONRef.current.addData(metroLineFeature); // might need to be geojson.features
    }
  }, [geoJSONRef, metroLineFeature]);

  const pathColor = metroLineFeature
    ? `#${metroLineFeature.properties.COLOR_LINIA}`
    : "red";

  return (
    <div className="map">
      <MapContainer
        center={[41.394458, 2.158904]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: 400 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {metroLineFeature && (
          <GeoJSON
            pathOptions={{ color: pathColor, weight: 5 }}
            ref={geoJSONRef}
            data={metroLineFeature}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MetroMap;
