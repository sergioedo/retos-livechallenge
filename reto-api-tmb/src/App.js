import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [metroLines, setMetroLines] = useState();
  const [lineSelectedCode, setLineSelectedCode] = useState();
  const [metroStations, setMetroStations] = useState();
  const [busStopFeature, setBusStopFeature] = useState();
  const [busStopTimes, setBusStopTimes] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.tmb.cat/v1/transit/linies/metro?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        const sortedFeatures = data.features.sort(
          (f1, f2) => f1.properties.ORDRE_LINIA - f2.properties.ORDRE_LINIA
        );
        setMetroLines({ ...data, features: sortedFeatures });
      });
  }, []);

  useEffect(() => {
    if (lineSelectedCode) {
      fetch(
        `https://api.tmb.cat/v1/transit/linies/metro/${lineSelectedCode}/estacions?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
      )
        .then(response => response.json())
        .then(data => {
          const sortedFeatures = data.features.sort(
            (f1, f2) =>
              f1.properties.ORDRE_ESTACIO - f2.properties.ORDRE_ESTACIO
          );
          setMetroStations({ ...data, features: sortedFeatures });
        });
    }
  }, [lineSelectedCode]);

  useEffect(() => {
    if (busStopFeature) {
      setBusStopTimes();
      const stopCode = busStopFeature.properties.CODI_PARADA;
      fetch(
        `https://api.tmb.cat/v1/ibus/stops/${stopCode}?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
      )
        .then(response => response.json())
        .then(data => {
          console.log(data.data.ibus);
          setBusStopTimes(data.data.ibus);
        });
    }
  }, [busStopFeature]);

  const handleLineSelected = event => {
    setMetroStations(null);
    if (event.target.value > 0) {
      setLineSelectedCode(Number(event.target.value));
    } else {
      setLineSelectedCode();
    }
  };

  const handleStopEntered = event => {
    if (event.key === "Enter") {
      setBusStopFeature();
      setBusStopTimes();
      const stopCode = event.target.value;
      if (!stopCode || isNaN(stopCode)) return;
      fetch(
        `https://api.tmb.cat/v1/transit/parades/${stopCode}?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
      )
        .then(response => response.json())
        .then(data => {
          if (data.features.length > 0) {
            setBusStopFeature(data.features[0]);
          }
        });
    }
  };

  const lineSelectedFeature = lineSelectedCode
    ? metroLines.features.filter(f => {
        return f.properties.CODI_LINIA === lineSelectedCode;
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
      <br />
      <br />
      <h3>Mapa de la Línea de Metro</h3>
      <p>Muestra la siguiente feature sobre una mapa:</p>
      <p>{lineSelectedFeature && JSON.stringify(lineSelectedFeature)}</p>
      <br />
      <br />
      <h3>Próximos buses en parada</h3>
      <input
        type="text"
        placeholder="Introduce el código de la parada"
        size="30"
        onKeyDown={handleStopEntered}
      ></input>
      <p>Muestra la parada sobre una mapa:</p>
      <p>{busStopFeature && JSON.stringify(busStopFeature)}</p>
      <p>
        {busStopFeature &&
          `Próximos buses en la parada ${busStopFeature.properties.CODI_PARADA}:`}
      </p>
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
    </div>
  );
}

export default App;
