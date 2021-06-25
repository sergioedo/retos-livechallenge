import useMetroLines from "../hooks/useMetroLines";
import useMetroStations from "../hooks/useMetroStations";
import MetroMap from "./MetroMap";

const MetroStations = () => {
  const [metroLines] = useMetroLines();
  const [
    metroStations,
    selectedLineCode,
    setSelectedLineCode
  ] = useMetroStations();

  const handleLineSelected = event => {
    if (event.target.value > 0) {
      setSelectedLineCode(Number(event.target.value));
    } else {
      setSelectedLineCode();
    }
  };

  const lineSelectedFeature = selectedLineCode
    ? metroLines.features.filter(f => {
        return f.properties.CODI_LINIA === selectedLineCode;
      })[0]
    : null;

  return (
    <div>
      <h3>Estaciones de Metro de Barcelona</h3>
      <label>Línea: </label>
      <select name="select" onChange={handleLineSelected}>
        <option key={0}>--- Selecciona una línea ---</option>
        {metroLines &&
          metroLines.features.map(metroLine => {
            return (
              <option
                key={metroLine.properties.CODI_LINIA}
                value={metroLine.properties.CODI_LINIA}
              >
                {metroLine.properties.NOM_LINIA}
              </option>
            );
          })}
      </select>
      <br />
      <br />
      <label>Estaciones:</label>
      <ul>
        {metroStations &&
          metroStations.features.map(metroStation => {
            return (
              <li key={metroStation.properties.CODI_ESTACIO}>
                {metroStation.properties.CODI_ESTACIO}-
                {metroStation.properties.NOM_ESTACIO}
              </li>
            );
          })}
      </ul>
      <h3>Mapa de la Línea de Metro</h3>
      <MetroMap metroLineFeature={lineSelectedFeature} />
    </div>
  );
};

export default MetroStations;
