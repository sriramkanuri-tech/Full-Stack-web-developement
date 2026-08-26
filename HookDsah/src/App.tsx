import { useState, useEffect } from "react";

function App() {
  const [temperature, setTemperature] = useState<number>(25);
  const [history, setHistory] = useState<number[]>([]);
  const [updateCount, setUpdateCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 50);
      setTemperature(newValue);
      setHistory((prev) => [...prev, newValue]);
      setUpdateCount((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">HookDash</h1>
      </header>

      <article className="p-4 border rounded">
        <h2 className="text-xl font-bold">Temperature Sensor</h2>
        <p className={temperature > 40 ? "text-red-500" : ""}>
          Current Reading: {temperature} °C
        </p>
      </article>

      <section className="mt-4">
        <p className="text-gray-700">Updates so far: {updateCount}</p>
        <p className="text-gray-700">History: {history.join(", ")}</p>
      </section>

      <footer className="text-center mt-6 text-gray-500">
        <p>Telemetry Dashboard © 2026</p>
      </footer>
    </main>
  );
}

export default App;
