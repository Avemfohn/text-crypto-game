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
          console.log(element.rows);
          element.rows = element.rows.filter((value) => (value.id) % 2 !== 0);
        });
      })
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/api/multiplayer/")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter(item => item.time !== 0);
        var multiplayerArray = [];
        for (var i = 0; i < data.length; i += 2) {
          var newObject = {};
          newObject = {
            user1: data[i].user,
            score1: data[i].score,
            user2: data[i + 1].user,
            score2: data[i + 1].score,
            time: data[i].time,
            date: data[i].date
          }
          multiplayerArray.push(newObject);
        }
        setMultiplayerScores(multiplayerArray);
        console.log(data);
        /*data.forEach((element) => {
          console.log("multi...", element.time);
          element = element.filter((value) => value.time !== 0);
        });*/
      })
      .catch((error) => console.error(error));

    fetch("http://127.0.0.1:8000/api/machine/")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter(item => item.id % 2 !== 0);
        console.log("data.length...",data.length)
        var machineScoreArray = [];
        for (var i = 0; i < data.length; i += 2) {
          var newObject = {};
          newObject = {
            user: data[i].user,
            score: data[i].score,
            machineScore: data[i + 1].score,
            time: data[i].time,
            date: data[i].date
          }
          machineScoreArray.push(newObject);
        }
        setMachineScores(machineScoreArray);
        console.log(data);
        /*data.forEach((element) => {
          element.rows = element.rows.filter((value) => value.time !== 0);
        });*/
      })
      .catch((error) => console.error(error));
  }, []);

  const multiplayerStyle = {
    width: '200px',
  };
  const machineStyle = {
    width: '300px',
  };


  return (
    <div>
      <h1>Tek Oyunculu Modu</h1>
      <table className="scores-table">
        <thead>
          <tr>
            <th style={machineStyle}>Kullanıcı</th>
            <th style={machineStyle}>Skor</th>
            <th>Zaman</th>
            <th>Tarih</th>
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
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h1>Çok Oyunculu Modu</h1>
      <table className="scores-table">
        <thead>
          <tr>
            <th style={multiplayerStyle}>Kullanıcı 1</th>
            <th>Skor</th>
            <th style={multiplayerStyle}>Kullanıcı 2</th>
            <th>Skor</th>
            <th>Zaman</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
        {multiplayerScores.map((scores) =>
              <tr key={scores.id}>
                <td>{scores.user1}</td>
                <td>{scores.score1}</td>
                <td>{scores.user2}</td>
                <td>{scores.score2}</td>
                <td>{scores.time}</td>
                <td>{scores.date}</td>
              </tr>
            
          )}
          
        </tbody>
      </table>

      <h1>Makine Modu</h1>
      <table className="scores-table">
        <thead>
          <tr>
            <th style={machineStyle}>Kullanıcı</th>
            <th>Skor</th>
            <th style={machineStyle}>Makine Puanı</th>
            <th>Zaman</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {machineScores.map((score) =>
              <tr key={score.id}>
                <td>{score.user}</td>
                <td>{score.score}</td>
                <td>{score.machineScore}</td>
                <td>{score.time}</td>
                <td>{score.date}</td>
              </tr>
            
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Ranks;
