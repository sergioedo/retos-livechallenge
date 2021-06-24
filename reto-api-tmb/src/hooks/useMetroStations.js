import { useState, useEffect } from "react";

const useMetroStations = () => {
  const [lineCode, setLineCode] = useState();
  const [metroStations, setMetroStations] = useState();

  useEffect(() => {
    if (lineCode) {
      fetch(
        `https://api.tmb.cat/v1/transit/linies/metro/${lineCode}/estacions?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
      )
        .then(response => response.json())
        .then(data => {
          const sortedFeatures = data.features.sort(
            (f1, f2) =>
              f1.properties.ORDRE_ESTACIO - f2.properties.ORDRE_ESTACIO
          );
          setMetroStations({ ...data, features: sortedFeatures });
        });
    } else {
      setMetroStations();
    }
  }, [lineCode]);

  return [metroStations, lineCode, setLineCode];
};

export default useMetroStations;
