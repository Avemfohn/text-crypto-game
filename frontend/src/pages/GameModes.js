import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const GameModes = () => {
    
    function singleModeClicked(params) {
        console.error("single...");
        localStorage.setItem("mode", "single");
    }

    function multiplayerModeClicked(params) {
        console.error("multi...");
        localStorage.setItem("mode", "multiplayer");
    }

    function machineModeClicked(params) {
        console.error("machine...");
        localStorage.setItem("mode", "machine");
    }

    return (
        <div className='gameModes'>
            <div className='header'>
                <Link to="/" className='backButton'>
                    <img src={require("../images/back_icon.png")}></img>
                    <p>Geri Dön</p>
                </Link>
                
            </div>
            <div className='modes'>
                <Link to="/username" onClick={singleModeClicked}>
                    <div className='mode' id='singleMode'>
                        <div className='modeContent'>
                            <img src={require('../images/singlePlayer.jpg')}></img>
                            <p className='modeTitle'>Tek Kişilik</p>
                            <p className='modeText'> Bu modda kişi belirli bir zamana karşı şifrelenmiş metinleri çözmeye çalışır.</p>
                            
                        </div>
                    </div>
                </Link>
                <Link to="/username" onClick={multiplayerModeClicked}>
                    <div className='mode' id='twoUser'>
                        <div className='modeContent'>
                            <img src={require('../images/multiplayer.jpg')}></img>
                            <p className='modeTitle'>Çok Oyunculu</p>
                            <p className='modeText'> Bu modda 2 kişi belirli bir zamana karşı şifrelenmiş metinleri çözmeye çalışır.</p>
                        </div>
                    </div>
                </Link>

                <Link to="/username" onClick={machineModeClicked}>
                <div className='mode' id='machineMode'>
                    <div className='modeContent'>
                        <img src={require('../images/againstMachine.jpg')}></img>
                        <p className='modeTitle'>Yapay Zekaya Karşı</p>
                        <p className='modeText'> Bu modda kişi makineye şifrelenmiş metinleri çözmeye çalışır.</p>
                    </div>
                </div>
                </Link>
            </div>
            
        </div>
    );
}
  
export default GameModes;
  