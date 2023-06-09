import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "react-query";
import axios from "axios";
import PlainTextTemplateSingle from '../singleMode/PlainTextTemplateSingle';
import Timer from '../../components/Timer';
import ModalView from '../../components/ModalView';
import ScoreView from '../singleMode/ScoreView';
import UserContext from '../../contexts/userContext';

const MultiplayerMode = (props) => {
    const [firstPlayerName, setFirstPlayerName, secondPlayerName, setSecondPlayerName, firstPlayerScore, setFirstPlayerScore, secondPlayerScore, setSecondPlayerScore] = useContext(UserContext);
    const [questionList, setQuestionList] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [levelPassed, setLevelPassed] = useState(false);
    const [gameMode, setGameMode] = useState(true);
    const [newLevel, setNewLevel] = useState(1);
    const [questionNum, setQuestionNum] = useState(0);
    const [wrongGuessCount, setWrongGuessCount] = useState(0);
    const [turn, setTurn] = useState(1);

    console.log("multimode...", localStorage.getItem("mode"))


    useEffect(() => {
        var questionNumber;
        if (newLevel === 1) {
            //questionNumber = Math.floor(Math.random() * 11);
            questionNumber = 10
        } /*else if (newLevel === 2) {
            questionNumber = Math.floor(Math.random() * 11)// + 10;
        } else if (newLevel === 3) {
            questionNumber = Math.floor(Math.random() * 11)// + 20;
        } if (newLevel === 4) {
            ////GAME OVER//////////
        }*/
        console.log("newLevel......", newLevel, questionNumber);

        setQuestionNum(questionNumber);
    }, [newLevel]);

    const fetchQuestions = async () => {
        return axios.get("http://localhost:4000/questions");
    };
    const { isLoading, error, data } = useQuery("questions", fetchQuestions,
        {
            enabled: refresh,
            staleTime: Infinity,
        });

    if (isLoading) return <h2>Loading...</h2>;
    if (error) return <h2>Error...</h2>;
    if (questionList.length === 0) {
        setQuestionList(data?.data);
        setRefresh(false);
    }

    console.log("questionNum...", questionNum);
    var question = '';
    var questionCipherText = '';
    var questionWords = [];

    if (questionList.length > 0) {
        question = data?.data[questionNum].text;
        questionCipherText = data?.data[questionNum].cipher;
        questionWords = question.split("");
    }

    function onSuccessHandler() {
        //var questionArray = questionList;
        if (questionNum > -1) { // only splice array when item is found
            //setQuestionList(questionArray.splice(questionNum, 1));
            setNewLevel(prevCount => prevCount + 1);
        }
        setLevelPassed(false);
        console.error("onSuccessHandler...", newLevel);
    }

    function onStopTimeHandler() {
        setLevelPassed(true);
    }

    /******When player wants to refresh the page...*******/
    window.addEventListener('beforeunload', function (e) {
        // Cancel the event
        e.preventDefault();
        console.error("refreshButtonClicked..")
        // Prompt the user with a message
        e.returnValue = 'Yunus Emre Gunes';
    });

    function exitGame() {
        setGameMode(!gameMode);
    }

    function wrongGuessCountHandle(count) {
        console.error("count....", count);
        setWrongGuessCount(count);
    }

    function wrongGuessHandle() {
        console.log("wronggg......", turn)
        if (turn === 1) {
            //setFirstPlayerScore(prevCount => prevCount - 10);
            setTurn(2);
        } else {
            //setSecondPlayerScore(prevCount => prevCount - 10);
            setTurn(1);
        }
    }

    function correctAnswerHandle(count) {
        /*if (turn === 1) {
            setFirstPlayerScore(prevCount => prevCount + (count * 10));
        } else {
            setSecondPlayerScore(prevCount => prevCount + (count * 10));
        }*/
    }

    return (
        <div>
             <div className="timer scoreView headerView">
                <div className='leftSide'>
                    <ScoreView wrong={wrongGuessCount} turn={turn} gameMode={"multi"} newLevel={newLevel} point={data?.data[questionNum].point}></ScoreView>
                    <button className='exitGameButton' onClick={exitGame}>Exit</button>
                </div>
                <Timer success={levelPassed}></Timer>
            </div>
            <div className='singleGame'>

                <div className='cipherText'>
                    {data?.data[questionNum].cipher}
                </div>
                <PlainTextTemplateSingle turn={turn} wrongGuess={wrongGuessHandle} wrongGuessCount={wrongGuessCountHandle} correct={correctAnswerHandle} cipherText={questionCipherText} question={question} questionWords={questionWords} stopTime={onStopTimeHandler} success={onSuccessHandler} newLevel={newLevel}></PlainTextTemplateSingle>
            </div>
            { gameMode ? <></> : <ModalView type="exitGame" exitHandler={exitGame}></ModalView>}

        </div>
    );
}

export default MultiplayerMode;

