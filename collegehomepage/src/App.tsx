import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

type Reading = { time: string; value: number };

function useSensorData() {
  const [data, setData] = useState<Reading[]>([]);
  const [running, setRunning] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      const value = Math.floor(Math.random() * 71) + 40;
      const time = new Date().toLocaleTimeString();
      setData(prev => [...prev, { time, value }].slice(-5));
      if (value < 60 || value > 100) {
        setRunning(false);
        setStopped(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  const start = () => {
    setStopped(false);
    setRunning(true);
  };
  const stop = () => setRunning(false);
  return { data, running, stopped, start, stop };
}

function App() {
  const { data, running, stopped, start, stop } = useSensorData();
  const latest = data[data.length - 1];

  return (
    <main className="p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">PulseDash</h1>
        <p>Real-Time Pulse Monitoring</p>
      </header>
      <section className="text-center mb-6">
        <h2 className="text-xl font-semibold">Live Pulse Readings</h2>
        {latest && <p>Current Pulse: <b>{latest.value} BPM</b></p>}
        <button onClick={start} className="bg-green-500 text-white px-4 py-2 m-2 rounded">Start</button>
        <button onClick={stop} className="bg-red-500 text-white px-4 py-2 m-2 rounded">Stop</button>
        {stopped && <p className="text-red-500 font-semibold">Stopped due to abnormal reading.</p>}
      </section>
      <section className="flex justify-center">
        <LineChart width={900} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" label={{ value: "Time", position: "insideBottom", offset: -5 }} />
          <YAxis domain={[40, 110]} label={{ value: "Pulse (BPM)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={true} />
        </LineChart>
      </section>
      <footer className="text-center mt-6 text-gray-500">PulseDash © 2026</footer>
    </main>
  );
}

export default App;