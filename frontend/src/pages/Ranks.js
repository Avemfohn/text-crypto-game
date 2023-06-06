import React, { useState, useEffect } from "react";

function Ranks() {
  const [singleplayerScores, setSingleplayerScores] = useState([]);
  const [multiplayerScores, setMultiplayerScores] = useState([]);
  const [machineScores, setMachineScores] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/singleplayer/")
      .then((response) => response.json())
      .then((data) => {
        setSingleplayerScores(data);
        console.log(data);
        data.forEach((element) => {
          element.rows = element.rows.filter((value) => value.time !== 0);
        });
      })
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/api/multiplayer/")
      .then((response) => response.json())
      .then((data) => {
        setMultiplayerScores(data);
        console.log(data);
        data.forEach((element) => {
          element.rows = element.rows.filter((value) => value.time !== 0);
        });
      })
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/api/machine/")
      .then((response) => response.json())
      .then((data) => {
        setMachineScores(data);
        console.log(data);
        data.forEach((element) => {
          element.rows = element.rows.filter((value) => value.time !== 0);
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Singleplayer Scores</h1>
      <table className="scores-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
            <th>Time</th>
            <th>Date</th>
            <th>Game Mode</th>
          </tr>
        </thead>
        <tbody>
          {singleplayerScores.map((score) =>
            score.rows.map((row) => (
              <tr key={row.id}>
                <td>{score.user}</td>
                <td>{row.score}</td>
                <td>{row.time}</td>
                <td>{row.date}</td>
                <td>{"SinglePlayer"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h1>Multiplayer Scores</h1>
      <table className="scores-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
            <th>Time</th>
            <th>Date</th>
            <th>Game Mode</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>

      <h1>Machine Scores</h1>
      <table className="scores-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
            <th>Time</th>
            <th>Date</th>
            <th>Game Mode</th>
          </tr>
        </thead>
        <tbody>
          {machineScores.map((score) =>
            score.rows.map((row) => (
              <tr key={row.id}>
                <td>{score.user}</td>
                <td>{row.score}</td>
                <td>{row.time}</td>
                <td>{row.date}</td>
                <td>{row.game_mode ? row.game_mode.name : "Machine"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Ranks;
