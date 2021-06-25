import "./App.css";
import MetroStations from "./components/MetroStations";
import BusStops from "./components/BusStops";

function App() {
  return (
    <div className="App">
      <MetroStations></MetroStations>
      <br />
      <br />
      <BusStops></BusStops>
    </div>
  );
}

export default App;
