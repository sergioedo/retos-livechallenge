import "./App.css";
import MetroStations from "./components/MetroStations";
import BusStops from "./components/BusStops";

function App() {
  return (
    <div className="App">
      <section className="App-Section">
        <MetroStations></MetroStations>
      </section>
      <section className="App-Section">
        <BusStops></BusStops>
      </section>
    </div>
  );
}

export default App;
