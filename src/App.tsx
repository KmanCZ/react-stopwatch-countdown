import { useState } from "react";
import Countdown from "./Countdown";
import StopWatch from "./StopWatch";

function App() {
  const [tab, setTab] = useState<0 | 1>(0);

  return (
    <div className="h-screen bg-gray-100">
      <div
        className={`rounded-lg rounded-tr-none bg-${
          tab === 0 ? "yellow" : "green"
        }-200 shadow-lg w-fit p-5 absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2`}
      >
        <ul className="absolute -top-10 right-0 flex flex-row">
          <li onClick={() => setTab(0)} className="tab bg-yellow-200">
            STOPWATCH
          </li>
          <li onClick={() => setTab(1)} className="tab bg-green-200">
            COUNTDOWN
          </li>
        </ul>
        {tab === 0 ? <StopWatch /> : <Countdown />}
      </div>
    </div>
  );
}

export default App;
