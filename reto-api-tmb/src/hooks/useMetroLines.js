import { useState, useEffect } from "react";

const useMetroLines = () => {
  const [metroLines, setMetroLines] = useState();

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

  return [metroLines];
};

export default useMetroLines;
