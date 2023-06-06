import React, {useState, useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Nlp from './NlpChart';
import DataContext from '../contexts/dataContext';
import { Link } from 'react-router-dom';
import UserContext from "../contexts/userContext";


function ModalView(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const nlpStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [isLoggedIn, setIsLoggedIn, levelScore, setLevelScore,  levelMinute, setLevelMinute, levelSecond, setLevelSecond] = useContext(DataContext);
    const [firstPlayerName, setFirstPlayerName, secondPlayerName, setSecondPlayerName, firstPlayerScore, setFirstPlayerScore, secondPlayerScore, setSecondPlayerScore] = useContext(UserContext);

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if (props.type === "nextLevel") {
            setOpen(false);
            props.nextLevelClickHandle()
            
        } else if (props.type === "exitGame") {
            setOpen(false);
            props.exitHandler();
            
        } else {
            setOpen(false);
            props.modalCloseHandle();
        }
        
    }
    let content;
    switch (props.type) {
        case "nlp":
            content = <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={nlpStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Harf Frekansları
                </Typography>
                <Typography component={'div'} sx={{ mt: 2 }}>
                    <Nlp question={props.question}></Nlp>
                </Typography>
                </Box>
            </Modal>
            break;
            case "gameOver":
                content = <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                </Typography>
                <Typography component={'div'} className='gameOverModal' id="modal-modal-description" sx={{ mt: 2 }}>
                    <img src={require("../images/icons8-checkmark-240.png")}></img>
                    <div className='statistics'>
                        <div className='scoreStatistics'>Puan: {levelScore}</div>
                        <div className='timeStatistics'>Zaman: {levelMinute < 10 ? <span>0{levelMinute }</span>:<span>{levelMinute }</span>}:{levelSecond < 10 ? <span>0{levelSecond }</span>:<span>{levelSecond }</span>}
                        </div>
                    </div>
                    <Link to="/" className='backButton'>
                        <button onClick={handleClose} className='gameOverButton'>
                            Anasayfaya Geri Dön
                        </button>
                    </Link>
                </Typography>
                </Box>
                </Modal>
                break;
            case "multipGameOver":
                content = (
                  <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2"></Typography>
                      <Typography
                        component={"div"}
                        className="gameOverModal"
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                      >
                        <img src={require("../images/icons8-checkmark-240.png")}></img>
                        <div className="statistics">
                          <div className="scoreStatistics">
                            {firstPlayerName}'in Puanı: {firstPlayerScore}
                          </div>
                          <div className="scoreStatistics">
                            {secondPlayerName}'in Puanı: {secondPlayerScore}
                          </div>
                        </div>
                        <Link to="/" className="backButton">
                          <button onClick={handleClose} className="gameOverButton">
                            Anasayfaya Geri Dön
                          </button>
                        </Link>
                      </Typography>
                    </Box>
                  </Modal>
                );
                break;

        case "machineGameOver":
                content = (
                  <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2"></Typography>
                      <Typography
                        component={"div"}
                        className="gameOverModal"
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                      >
                        <img src={require("../images/icons8-checkmark-240.png")}></img>
                        <div className="statistics">
                          <div className="scoreStatistics">
                            {firstPlayerName}'in Puanı: {firstPlayerScore}
                          </div>
                          <div className="scoreStatistics">
                            Makine Puanı: {secondPlayerScore}
                          </div>
                        </div>
                        <Link to="/" className="backButton">
                          <button onClick={handleClose} className="gameOverButton">
                            Anasayfaya Geri Dön
                          </button>
                        </Link>
                      </Typography>
                    </Box>
                  </Modal>
                );
                break;

        case "nextLevel":
            content = <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
                    <Typography component={'div'} className='nextLevelModal' id="modal-modal-description" sx={{ mt: 2 }}>
                        <img src={require("../images/icons8-checkmark-240.png")}></img>
                        <div className='statistics'>
                            <div className='scoreStatistics'>Puan: {levelScore}</div>
                            <div className='timeStatistics'>Zaman: {levelMinute < 10 ? <span>0{levelMinute }</span>:<span>{levelMinute }</span>}:{levelSecond < 10 ? <span>0{levelSecond }</span>:<span>{levelSecond }</span>}
                            </div>
                        </div>
                        <button onClick={handleClose} className='nextLevelButton'>
                            Next Level
                        </button>
                    </Typography>
                    </Box>
                </Modal>
                break;

            case "multipNextLvl":
                content = (
                    <Modal
                        open={open}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                            </Typography>
                            <Typography component={'div'} className='nextLevelModal' id="modal-modal-description" sx={{ mt: 2 }}>
                                <img src={require("../images/icons8-checkmark-240.png")}></img>
                                <div className='statistics'>
                                    <div className='scoreStatistics'>{firstPlayerName}'s Score: {firstPlayerScore}</div>
                                    <div className='scoreStatistics'>{secondPlayerName}'s Score: {secondPlayerScore}</div>
                                    <div className='timeStatistics'>Time: {levelMinute < 10 ? <span>0{levelMinute }</span>:<span>{levelMinute }</span>}:{levelSecond < 10 ? <span>0{levelSecond }</span>:<span>{levelSecond }</span>}
                                    </div>
                                </div>
                                <button onClick={handleClose} className='nextLevelButton'>
                                    Next Level
                                </button>
                            </Typography>
                        </Box>
                    </Modal>
                );
                break;

            case "exitGame":
                content = <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    </Typography>
                    <Typography component={'div'} className='exitGameModal' id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className='exitText'>Oyundan devam etmek istemediğinize emin misiniz? Devam etmezseniz tüm ilerlemeniz kaybolacaktır.</div>
                        <div className='exitModalButtons'>
                            <button onClick={handleClose} className='turnBackToGame'>
                                Oyuna Dön
                            </button>
                            <Link to="/" className='backButton'>
                                <button onClick={handleClose} className='leaveTheGame'>
                                    Oyundan Çık
                                </button>
                            </Link>
                        </div>
                       
                    </Typography>
                    </Box>
                </Modal>
                break;
        default:
            break;
    }

    useEffect(() => {
        console.log("changeScore...", props.type);
        if (props.type === "gameOver") {
            console.error("type....gameOver");
            if (localStorage.getItem("mode") === "single") {
                let time = levelMinute * 60 + levelSecond;
                console.error("time..............", levelScore, time)
                postData(isLoggedIn, levelScore, time, localStorage.getItem("mode"));//.then(r => console.log(r));
            }
        }
        if (props.type === "multipGameOver") {
            if (localStorage.getItem("mode") === "multiplayer") {
                let time = levelMinute * 60 + levelSecond;
                postMultipleData(firstPlayerName, firstPlayerScore, secondPlayerName, secondPlayerScore, time, localStorage.getItem("mode"));//.then(r => console.log(r));
            }
            
        }
        if (props.type ==="machineGameOver") {
            if (localStorage.getItem("mode") === "machine") {
                let time = levelMinute * 60 + levelSecond;
                postData(isLoggedIn, levelScore, time, localStorage.getItem("mode"));//.then(r => console.log(r));
            }
        }

    }, [levelScore, levelSecond]);

    const postMultipleData = (firstUser, firstScore, secondUser, secondScore, time) => {
        const url = "http://localhost:8000/api/multiplayer/";

    const firstData = {
        user: firstUser,
                score: firstScore,
                time: time,
                date: "2023-03-29",
    };

    const secondData = {
        user: secondUser,
                score: secondScore,
                time: time,
                date: "2023-03-29",
    };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(firstData)
        })
        .then(response => response.json())
        .then(firstData => console.log(firstData))
        .catch(error => console.error(error));

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(secondData)
        })
        .then(response => response.json())
        .then(secondData => console.log(secondData))
        .catch(error => console.error(error));
    };
    
    const postMachineData = (firstUser, firstScore, machineScore, time) => {
          const url = "http://localhost:8000/api/machine/";

    const userData = {
        user: firstUser,
                score: firstScore,
                time: time,
                date: "2023-03-29",
    };

    const machineData = {
        user: "Machine",
                score: machineScore,
                time: time,
                date: "2023-03-29",
    };

          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
          })
            .then(response => response.json())
            .then(data => {
              const gameId = data.id;
              machineData.rows[0].game_id = gameId;

              fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(machineData)
              })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
        };


    const postData = (firstUser, firstScore, time) => {
        const url = "http://localhost:8000/api/singleplayer/";

    const data = {
        user: firstUser,
        rows: [
            {
                score: firstScore,
                time: time,
                date: "2023-03-29",

            },
        ],

    };
    
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

    console.log(props.type);
    return (
        <div>
            {content} 
        </div>
    );
}

export default ModalView;