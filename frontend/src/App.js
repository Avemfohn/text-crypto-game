import "./App.css";
import React, {useContext, useEffect} from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "./pages/Home"
import DataContext from "./contexts/dataContext";
import {Routes, Route} from "react-router-dom"
import GameModes from "./pages/GameModes";
import SingleMode from "./pages/singleMode/SingleMode";
import UsernameView from "./pages/Username";
import MultiplayerMode from "./pages/multiplayerMode/MultiplayerMode";
import Ranks from "./pages/Ranks";
import MachineMode from "./pages/machineMode/MachineMode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useContext(DataContext);
  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/gameModes" element={<GameModes/>} />
          <Route path="/username" element={<UsernameView/>} />

          <Route path="/singleGame" element={<SingleMode value={true}/>} />
          <Route path="/multiplayerGame" element={<MultiplayerMode value={true}/>} />
          <Route path="/machineGame" element={<MachineMode value={true}/>} />
          <Route path="/ranks" element={<Ranks/>} />
        </Routes>

      </div>
    </QueryClientProvider>
  );
}

export default App;
