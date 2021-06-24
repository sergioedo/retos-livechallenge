import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [metroLines, setMetroLines] = useState();
  const [lineSelected, setLineSelected] = useState();
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
    if (lineSelected) {
      fetch(
        `https://api.tmb.cat/v1/transit/linies/metro/${lineSelected}/estacions?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
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
  }, [lineSelected]);

  const handleLineSelected = event => {
    setMetroStations(null);
    if (event.target.value > 0) {
      setLineSelected(event.target.value);
    }
  };

  return (
    <div className="App">
      <h3>Metro de Barcelona</h3>
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
    </div>
  );
}

export default App;
