import React, { useState, useEffect } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [countdowns, setCountdowns] = useState([]);

  // Add new countdown
  const handleAddCountdown = () => {
    const seconds = parseInt(inputValue);
    if (!isNaN(seconds) && seconds > 0) {
      const newCountdown = {
        id: Date.now(),
        value: seconds,
      };
      setCountdowns((prev) => [...prev, newCountdown]);
      setInputValue("");
    }
  };

  // Countdown logic: decrement value every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns) =>
        prevCountdowns
          .map((cd) => ({ ...cd, value: cd.value - 1 }))
          .filter((cd) => cd.value > 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Multiple Countdown Timers</h1>
      <div style={styles.inputContainer}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter seconds"
          style={styles.input}
        />
        <button onClick={handleAddCountdown} style={styles.button}>
          Start Countdown
        </button>
      </div>

      <div style={styles.timerContainer}>
        {countdowns.map((cd) => (
          <div key={cd.id} style={styles.timerBox}>
            {cd.value}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
  },
  inputContainer: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
  },
  input: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "160px",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  timerContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  timerBox: {
    padding: "1rem 2rem",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    fontSize: "1.25rem",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
};
