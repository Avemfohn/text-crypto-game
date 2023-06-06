import React, {useState} from 'react';
import {Link} from "react-router-dom"


const Home = () => {
    return (
        <div className="homePage">
            <div className='title'>
                TEXT CRYPTANALYSIS GAME
            </div>
            <div className='navigationButtons'>
                <Link to="/gameModes">
                    <button className='startButton'>
                        Başla
                    </button>
                </Link>
                <Link to="/ranks">
                    <button className='ranksButton'>
                        Sıralamalar
                    </button>
                </Link>
                <Link to="/options">
                    <button className='optionsButton'>
                        Seçenekler
                    </button>
                </Link>
            </div>
        </div>
    );
}
  
export default Home;
  