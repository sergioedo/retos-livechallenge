import useBusStop from "../hooks/useBusStops";
import BusStopMap from "./BusStopMap";

const BusStops = () => {
  const [stopCode, setStopCode, busStopFeature, busStopTimes] = useBusStop();

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

  return (
    <div className="App-Container">
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
};

export default BusStops;
