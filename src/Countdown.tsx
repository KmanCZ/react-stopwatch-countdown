import { useState, useEffect } from "react";

function Countdown() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(1);
  const [intervalId, setIntervalId] = useState<number>();

  useEffect(() => {
    if (running) {
      setTime(hours * 3600 + minutes * 60 + seconds);
      setIntervalId(setInterval(() => setTime((prev) => --prev), 1000));
    } else if (!running) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [running]);

  useEffect(() => {
    if (time === 0) {
      setRunning(false);
    }
  }, [time]);

  return (
    <>
      <h1 className="text-center uppercase font-bold text-5xl mb-2">
        Countdown timer
      </h1>
      <Watch
        hours={hours}
        setHours={setHours}
        minutes={minutes}
        setMinutes={setMinutes}
        seconds={seconds}
        setSeconds={setSeconds}
        time={time}
        running={running}
      />
      <div className="flex justify-center">
        <button
          className="btn bg-green-500 hover:bg-green-600"
          onClick={() => setRunning(true)}
        >
          Start
        </button>
        <button
          className="btn bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            clearInterval(intervalId);
          }}
        >
          Pause
        </button>
        <button
          className="btn bg-orange-500 hover:bg-orange-600"
          onClick={() => {
            setIntervalId(setInterval(() => setTime((prev) => --prev), 1000));
          }}
        >
          Continue
        </button>
        <button
          className="btn bg-red-500 hover:bg-red-600"
          onClick={() => setRunning(false)}
        >
          Stop
        </button>
      </div>
    </>
  );
}

interface WatchProps {
  time: number;
  hours: number;
  setHours: React.Dispatch<React.SetStateAction<number>>;
  minutes: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  running: boolean;
}

function Watch({
  time,
  hours,
  minutes,
  seconds,
  setHours,
  setMinutes,
  setSeconds,
  running,
}: WatchProps) {
  const formated = new Date(time * 1000).toISOString().slice(11, -5);

  if (!running) {
    return (
      <div className="text-center text-4xl mb-2">
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          min={0}
        />{" "}
        :{" "}
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          min={0}
          max={59}
        />{" "}
        :{" "}
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
          min={1}
          max={59}
        />
      </div>
    );
  } else {
    return (
      <div className=" text-center text-4xl mb-2">
        <span>{formated.slice(0, 2)}</span> :{" "}
        <span>{formated.slice(3, 5)}</span> : <span>{formated.slice(6)}</span>
      </div>
    );
  }
}

export default Countdown;
