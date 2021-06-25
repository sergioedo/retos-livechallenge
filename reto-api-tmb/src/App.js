import "./App.css";
import useMetroLines from "./hooks/useMetroLines";
import useMetroStations from "./hooks/useMetroStations";
import useBusStop from "./hooks/useBusStops";
import MetroMap from "./components/MetroMap";
import BusStopMap from "./components/BusStopMap";

function App() {
  const [metroLines] = useMetroLines();
  const [
    metroStations,
    selectedLineCode,
    setSelectedLineCode
  ] = useMetroStations();
  const [stopCode, setStopCode, busStopFeature, busStopTimes] = useBusStop();

  const handleLineSelected = event => {
    if (event.target.value > 0) {
      setSelectedLineCode(Number(event.target.value));
    } else {
      setSelectedLineCode();
    }
  };

  const handleStopEntered = event => {
    if (event.key === "Enter") {
      const stopCode = event.target.value;
      if (!stopCode || isNaN(stopCode)) {
        setStopCode();
        return;
      }
      setStopCode(stopCode);
    }
  };

  const lineSelectedFeature = selectedLineCode
    ? metroLines.features.filter(f => {
        return f.properties.CODI_LINIA === selectedLineCode;
      })[0]
    : null;

  return (
    <div className="App">
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
      <br />
      <br />
      <h3>Próximos buses en parada</h3>
      <input
        type="text"
        placeholder="Introduce el código de la parada"
        size="30"
        onKeyDown={handleStopEntered}
      ></input>
      <p>{stopCode && `Próximos buses en la parada ${stopCode}:`}</p>
      <ul>
        {busStopTimes &&
          busStopTimes.map((busStopTime, index) => {
            return (
              <li key={index}>
                Línea {busStopTime.line} dirección {busStopTime.destination} en{" "}
                {busStopTime["t-in-min"]} min.
              </li>
            );
          })}
      </ul>
      <h3>Ubicación de la parada:</h3>
      <BusStopMap busStopFeature={busStopFeature} />
    </div>
  );
}

export default App;
