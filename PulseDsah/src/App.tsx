import { useState, useEffect, useRef } from "react";

function App() {
  const [pulse, setPulse] = useState(75);
  const [history, setHistory] = useState<number[]>([]);
  const [abnormal, setAbnormal] = useState(0);
  const [running, setRunning] = useState(true);
  const abnormalRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      const value = Math.floor(Math.random() * 71) + 50;
      setPulse(value);
      setHistory(prev => [...prev, value]);
      if (value < 60 || value > 100) {
        abnormalRef.current++;
        setAbnormal(abnormalRef.current);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [running]);

  const average = history.length
    ? (history.reduce((a, b) => a + b, 0) / history.length).toFixed(1)
    : "0.0";
  const isAbnormal = pulse < 60 || pulse > 100;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-red-400">PulseDash</h1>
        <p className="text-slate-400">Live Pulse Telemetry</p>
      </header>

      <section className="max-w-3xl mx-auto">
        <article className={`p-8 rounded-2xl text-center border ${
          isAbnormal ? "border-red-500" : "border-green-500"}`}>
          <h2>Current Pulse</h2>
          <p className={`text-7xl font-bold ${
            isAbnormal ? "text-red-400" : "text-green-400"}`}>{pulse}</p>
          <p>BPM {isAbnormal ? "⚠ Abnormal" : "✓ Normal"}</p>
        </article>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-900 p-4 rounded-xl">Avg: <b>{average}</b></div>
          <div className="bg-slate-900 p-4 rounded-xl">Readings: <b>{history.length}</b></div>
          <div className="bg-slate-900 p-4 rounded-xl">Abnormal: <b>{abnormal}</b></div>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl mt-6">
          <h2 className="font-bold">History</h2>
          <p className="text-slate-400">{history.join(", ") || "Waiting..."}</p>
        </div>

        <button onClick={() => setRunning(!running)}
          className={`mt-6 w-full py-3 rounded-xl font-bold ${
          running ? "bg-red-600" : "bg-green-600"}`}>
          {running ? "⏹ Stop" : "▶ Start"}
        </button>
      </section>
    </main>
  );
}

export default App;