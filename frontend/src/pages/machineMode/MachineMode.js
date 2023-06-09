import React, {useState, useEffect, Suspense} from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from "react-query";
import axios from "axios";
//import PlainTextTemplateNew from '../singleMode/PlainTextTemplateNew';
import Timer from '../../components/Timer';
import ModalView from '../../components/ModalView';
import ScoreView from '../singleMode/ScoreView';
import {machine} from './machineAnswer';
//import { ChildProcess } from 'child_process';
const PlainTextTemplateNew = React.lazy(() => import('../singleMode/PlainTextTemplateNew'));


const MachineMode = (props) => {
    const [questionList, setQuestionList] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [levelPassed, setLevelPassed] = useState(false);
    const [gameMode, setGameMode] = useState(true);
    const [newLevel, setNewLevel] = useState(1);
    const [questionNum, setQuestionNum] = useState(0);
    const [wrongGuessCount, setWrongGuessCount] = useState(0);
    var text = "Dlt dloığ dlt ısoğvlp dçükpgç rvytöçnvçgkt Uyuycoynvçp nktkoçp dlt nsşğilp gğaçöok roçtçn ısoğvğ nçgçt ığolş vçö uy lfğeğnnğp nçföçuk glnnçvlpl fğnğt Glnnçvoğ lcoğt roçbk Nsşğn uyuçöküvkt çöç ısoğvğ ığoglilpgğ uygçnl bçpuköçukpk ıstzş nrtnöçnvçgkt Dy bzcgğp gğ uyby lföğgğp nçföçnvçgkt Urpypgç nsşğn uyuycoyiç gçbçpçöçbkş nğpglpl ısoğvğ çvçt ağ nğpgl bçpuköçukpk ıstöğglil lflp uyby lfğt R çpgç dloığ gzüzpzt Dğplö dypgçp sitğpglilö üy rogy gğt Dlt lpuçpkp luvğnoğtl loğ çtçukpgçnl ğpığo friy cçöçp nğpgl lflpgğ dzbzvvziz nrtnyoçtgkt Nğpgl lflpgğ dzbzvvziz ğpığooğtglt İpuçp dypy çüçtuç luvğglnoğtlpl ğogğ ğgğdlolt Çöç dltçc gçjç gzüzpzpeğ çuokpgç ığtfğn sitğpglil üğblp dypgçp hçtnok rogyiypy ıstzt Çuko sitğpglil üğb lpuçpkp dlt dloığ dloğ rouç dlt nsşğnvğp sitğpğdloğeğil dloılplp açt rogyiygyt Dy bzcgğp pğ açtuç şçboçü uğpgğp gğ sitğploğeğn dlt üğboğt açtgkt gliğt lpuçpoçt lflp"

    //var machinee = machine("Dlt dloığ dlt ısoğvlp dçükpgç rvytöçnvçgkt Uyuycoynvçp nktkoçp dlt nsşğilp gğaçöok roçtçn ısoğvğ nçgçt ığolş vçö uy lfğeğnnğp nçföçuk glnnçvlpl fğnğt Glnnçvoğ lcoğt roçbk Nsşğn uyuçöküvkt çöç ısoğvğ ığoglilpgğ uygçnl bçpuköçukpk ıstzş nrtnöçnvçgkt Dy bzcgğp gğ uyby lföğgğp nçföçnvçgkt Urpypgç nsşğn uyuycoyiç gçbçpçöçbkş nğpglpl ısoğvğ çvçt ağ nğpgl bçpuköçukpk ıstöğglil lflp uyby lfğt R çpgç dloığ gzüzpzt Dğplö dypgçp sitğpglilö üy rogy gğt Dlt lpuçpkp luvğnoğtl loğ çtçukpgçnl ğpığo friy cçöçp nğpgl lflpgğ dzbzvvziz nrtnyoçtgkt Nğpgl lflpgğ dzbzvvziz ğpığooğtglt İpuçp dypy çüçtuç luvğglnoğtlpl ğogğ ğgğdlolt Çöç dltçc gçjç gzüzpzpeğ çuokpgç ığtfğn sitğpglil üğblp dypgçp hçtnok rogyiypy ıstzt Çuko sitğpglil üğb lpuçpkp dlt dloığ dloğ rouç dlt nsşğnvğp sitğpğdloğeğil dloılplp açt rogyiygyt Dy bzcgğp pğ açtuç şçboçü uğpgğp gğ sitğploğeğn dlt üğboğt açtgkt gliğt lpuçpoçt lflp");
    //console.log(machinee)
    /*const spawner = ChildProcess.spawn;
    const data_to_pass_in = "Send this to python Yunus Emre Güneş";
    const python_process = spawner('python', ["./test.py", JSON.stringify(data_to_pass_in)]);
    python_process.stdout.on('data', (data) => {
        console.log("Data received from pythom...", JSON.parse(data.toString()));

    })*/


    useEffect(() => {
        var questionNumber;
        if (newLevel === 1) {
            //questionNumber = Math.floor(Math.random() * 11);
            questionNumber = 11;
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

    function machineAnswerReturn() {
        console.log(questionCipherText);
        return questionCipherText;
    }




    /////////////YUNUS EMRE GUNES ////////////////////////////
    //CipherTexti backend gönderip plain text haline çevirmek için kullanılcak ama ciphertext i ne olarak göndereceğiz, yaptım ama emin değilim??????

    const solveCiphertext = async () => {
      try {
        const response = await axios.post('/api/ciphertexts/', { text: questionCipherText });
        const plaintext = response.data.text;
        // Do something with the plaintext, such as updating the state or displaying it in the UI
      } catch (error) {
        console.error('Failed to solve ciphertext:', error);
      }
    };


    return (
        <div>
             <div className="timer scoreView headerView">                
                <div className='leftSide'>
                    <ScoreView wrong={wrongGuessCount} gameMode={"machine"} newLevel={newLevel} point={data?.data[questionNum].point}></ScoreView>
                    <button className='exitGameButton' onClick={exitGame}>Exit</button>
                </div>
                <Timer success={levelPassed}></Timer>
            </div>
            <div className='singleGame'>

                <div className='cipherText'>
                    {data?.data[questionNum].cipher}
                </div>
                <Suspense fallback={<div>Yükleniyor...</div>}>
                    
                    <PlainTextTemplateNew machineAnswer={/*machine(questionCipherText.replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/gi, ''))MERTCANNNNNNN*/machine("qqq")} wrongGuessCount={wrongGuessCountHandle}cipherText={questionCipherText} question={question} questionWords={questionWords} stopTime={onStopTimeHandler} success={onSuccessHandler} newLevel={newLevel}></PlainTextTemplateNew>
                </Suspense>
            </div>
            { gameMode ? <></> : <ModalView type="exitGame" exitHandler={exitGame}></ModalView>}
        </div>
    );
}
  
export default MachineMode;

  