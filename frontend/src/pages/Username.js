/*import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../contexts/dataContext';

const UsernameView = () => {
    const [isLoggedIn, setIsLoggedIn, levelScore, setLevelScore,  levelMinute, setLevelMinute, levelSecond, setLevelSecond] = useContext(DataContext);
    const [input, setInput] = useState("");

    function inputChange(e) {
        console.error(e.target.value);
        setInput(e.target.value);
    }

    function userNameHandle() {
        console.error("input...", input);
        if (input.trim() === "") {
            console.error("error...");
        } else {
            setIsLoggedIn(input.trim());
        }

    }
    return (
        <div className='usernameView'>
            <div className='header'>
                <p>Oyuna başlamadan önce bir kullanıcı adı girmelisiniz.</p>
            </div>
            <form className="usernameInputForm">
                <input onChange={inputChange} className="username" type="text" ></input>
            </form>
            {isLoggedIn.length > 0 ? <Link to="/singleGame"><button onClick={userNameHandle} className='startButton'>Başla</button></Link> :
            <button onClick={userNameHandle} className='startButton'>Başla</button>}
            
            
        </div>
    );
}
  
export default UsernameView;
*/




import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../contexts/dataContext';
import UserContext from '../contexts/userContext';

const UsernameView = () => {
    const [isLoggedIn, setIsLoggedIn, levelScore, setLevelScore, levelMinute, setLevelMinute, levelSecond, setLevelSecond] = useContext(DataContext);
    const [firstPlayerName, setFirstPlayerName, secondPlayerName, setSecondPlayerName, firstPlayerScore, setFirstPlayerScore, secondPlayerScore, setSecondPlayerScore] = useContext(UserContext);

    const [input, setInput] = useState("");
    const [secondInput, setSecondInput] = useState("");

    const [gameMode, setGameMode] = useState(localStorage.getItem("mode"));


    console.error("mode...", gameMode);

    function inputChange(e) {
        setInput(e.target.value.trim());
    }

    function secondInputChange(e) {
        setSecondInput(e.target.value.trim());
    }

    useEffect(() => {
        let timerId;

        function debounceInput(value) {
            console.error(value);
            // Do whatever you want with the debounced input value here
        }

        function handleInputChange() {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                debounceInput(input);
            }, 300);
        }

        // Use the inputChange function as a dependency in the useEffect hook
        document.addEventListener('input', handleInputChange);

        return () => {
            document.removeEventListener('input', handleInputChange);
            clearTimeout(timerId);
        };
    }, [input]); // Pass input as a dependency to the useEffect hook

    useEffect(() => {
        let timerId;

        function debounceSecondInput(value) {
            console.error(value);
            // Do whatever you want with the debounced input value here
        }

        function handleSecondInputChange() {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                debounceSecondInput(secondInput);
            }, 300);
        }

        // Use the inputChange function as a dependency in the useEffect hook
        document.addEventListener('input', handleSecondInputChange);

        return () => {
            document.removeEventListener('input', handleSecondInputChange);
            clearTimeout(timerId);
        };
    }, [secondInput]); // Pass input as a dependency to the useEffect hook

    function userNameHandle() {
        console.error("input...", input.length);
        if (input.length === 0) {
            console.error("error...");
        } else {
            setIsLoggedIn(input);
            setFirstPlayerName(input);
        }
    }

    function multipleUserNameHandle() {
        console.error("input...", input.length, secondInput.length);
        if (input.length === 0 || secondInput.length === 0) {
            console.error("error...");
        } else {
            console.error("inputSuccess.....", input, secondInput);
            setFirstPlayerName(input);
            setSecondPlayerName(secondInput)
            //setIsLoggedIn(input);
        }
    }

   return (
  <div className='usernameView'>
    {
      gameMode === "single" ?
      <>
        <div className='header'>
          <p>Oyuna başlamadan önce bir kullanıcı adı girmelisiniz.</p>
        </div>
        <form className="usernameInputForm">
          <input onChange={inputChange} className="username" type="text"></input>
        </form>
        {
          input.length > 0 ?
          <Link to="/singleGame">
            <button onClick={userNameHandle} className='startButton'>Başla</button>
          </Link> :
          <button onClick={userNameHandle} className='startButton'>Başla</button>
        }
      </> : gameMode === "multiplayer" ?
      <>
        <div className='header'>
          <p>Oyuna başlamadan önce kullanıcı adlarını girmelisiniz.</p>
        </div>
        <div className='multipleUserName'>
          <form className="usernameInputForm">
            <input onChange={inputChange} className="username" type="text" placeholder='Player 1'></input>
          </form>
          <form className="usernameInputForm">
            <input onChange={secondInputChange} className="username" type="text" placeholder='Player 2'></input>
          </form>
        </div>
        {
          input.length > 0 ?
          <Link to="/multiplayerGame">
            <button onClick={multipleUserNameHandle} className='startButton'>Başla</button>
          </Link> :
          <button onClick={multipleUserNameHandle} className='startButton'>Başla</button>
        }
      </> : gameMode === "machine" ?
      <>
        <div className='header'>
          <p>Oyuna başlamadan önce bir kullanıcı adı girmelisiniz.</p>
        </div>
        <form className="usernameInputForm">
          <input onChange={inputChange} className="username" type="text"></input>
        </form>
        {
          input.length > 0 ?
          <Link to="/machineGame">
            <button onClick={userNameHandle} className='startButton'>Başla</button>
          </Link> :
          <button onClick={userNameHandle} className='startButton'>Başla</button>
        }
      </> : null
    }
  </div>
);

}

export default UsernameView;