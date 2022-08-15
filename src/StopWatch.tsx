import { useState, useEffect } from "react";

function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [times, setTimes] = useState<number[]>([]);

  useEffect(() => {
    let interval: number = NaN;
    if (running) {
      interval = setInterval(() => setTime((prev) => ++prev), 1000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <>
      <h1 className="text-center uppercase font-bold text-5xl mb-2">
        Stopwatch timer
      </h1>
      <Watch time={time} />
      <div className="flex justify-center">
        <button
          className="btn bg-green-500 hover:bg-green-600"
          onClick={() => setRunning(true)}
        >
          Start
        </button>
        <button
          className="btn bg-red-500 hover:bg-red-600"
          onClick={() => setRunning(false)}
        >
          Stop
        </button>
        <button
          className="btn bg-blue-500 hover:bg-blue-600"
          onClick={() => {
            setTime(0);
            setTimes([]);
            setRunning(false);
          }}
        >
          Reset
        </button>
        <button
          className="btn bg-orange-500 hover:bg-orange-600"
          onClick={() => setTimes((prev) => [...prev, time])}
        >
          Save Time
        </button>
      </div>
      <TableOfTimes times={times} />
    </>
  );
}

interface WatchProps {
  time: number;
}

function Watch({ time }: WatchProps) {
  const formated = new Date(time * 1000).toISOString().slice(11, -5);

  return (
    <div className=" text-center text-4xl mb-2">
      <span>{formated.slice(0, 2)}</span> : <span>{formated.slice(3, 5)}</span>{" "}
      : <span>{formated.slice(6)}</span>
    </div>
  );
}

interface TableOfTimesProps {
  times: number[];
}

function TableOfTimes({ times }: TableOfTimesProps) {
  return (
    <div className="h-44 w-98 overflow-scroll">
      <table className="table-fixed border-collapse w-full text-center">
        <thead>
          <tr className="border-b-[1px] border-black">
            <th className="w-12 border-r-[1px] border-black">Num</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {times.map((time, inx) => (
            <tr key={inx} className="border-b-[1px] border-black h-7">
              <td className="border-r-[1px] border-black">{inx + 1}</td>
              <td>{new Date(time * 1000).toISOString().slice(11, -5)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StopWatch;
