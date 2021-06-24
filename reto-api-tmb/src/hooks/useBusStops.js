import { useState, useEffect } from "react";

const useBusStop = () => {
  const [stopCode, setStopCode] = useState();
  const [busStopFeature, setBusStopFeature] = useState();
  const [busStopTimes, setBusStopTimes] = useState([]);

  useEffect(() => {
    setBusStopFeature();
    if (stopCode) {
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
  }, [stopCode]);

  useEffect(() => {
    setBusStopTimes();
    if (stopCode) {
      fetch(
        `https://api.tmb.cat/v1/ibus/stops/${stopCode}?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
      )
        .then(response => response.json())
        .then(data => {
          setBusStopTimes(data.data.ibus);
        });
    }
  }, [stopCode]);

  return [stopCode, setStopCode, busStopFeature, busStopTimes];
};

export default useBusStop;
