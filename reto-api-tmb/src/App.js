import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [metroLines, setMetroLines] = useState();
  const [lineSelectedCode, setLineSelectedCode] = useState();
  const [metroStations, setMetroStations] = useState();

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

  const handleLineSelected = event => {
    setMetroStations(null);
    if (event.target.value > 0) {
      setLineSelectedCode(Number(event.target.value));
    } else {
      setLineSelectedCode();
    }
  };

  const lineSelectedFeature = lineSelectedCode
    ? metroLines.features.filter(f => {
        return f.properties.CODI_LINIA == lineSelectedCode;
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
    </div>
  );
}

export default App;
