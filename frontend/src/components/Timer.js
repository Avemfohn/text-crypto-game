import React from 'react';
import {useEffect, useState, useContext} from "react";
import DataContext from "../contexts/dataContext"


function Timer(props) {
    const [isLoggedIn, setIsLoggedIn, levelScore, setLevelScore, levelMinute, setLevelMinute, levelSecond, setLevelSecond] = useContext(DataContext);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const timeArr=[];
    const [tempTime, setTempTime] = useState(0);
    const [realTime, setRealTime] = useState(0);
    let scoreTime=0;
    const [ctr, setCtr] = useState(0);
    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setIsActive(true);
    }

    function stop() {
        setIsActive(false);
    }
    function start() {
        setIsActive(true);
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }
    , [isActive, seconds]);

    let time = minutes * 60 + seconds;


    useEffect(() => {
        if (seconds === 60) {
            setMinutes(minutes => minutes + 1);
            setSeconds(0);
        }
        if (minutes === 60) {
            setHours(hours => hours + 1);
            setMinutes(0);
        }
    }
    , [seconds, minutes]);

    useEffect(() => {
        if (props.success) {
            stop();
            setCtr(ctr => ctr + 1);
            console.log("ctr", ctr)
            if(ctr===1 && time - tempTime < 300){
                scoreTime=(300- time)*2;
                setRealTime(time);
            }
            else if(ctr===1){
                scoreTime=0;
                setRealTime(time);
            }
            else {

                if (time - tempTime < 300) {
                    console.log("TEmptime", tempTime)
                    console.log("time", time)
                    let timeDiff = time - tempTime;
                    console.log("timeDiff", timeDiff)
                    scoreTime = (300 - time) * 2;
                    setRealTime(time)
                    console.log("scoreTime", scoreTime)
                }
                else {
                    scoreTime += 0;
                }
            }
            setLevelScore(scoreTime);
            setLevelMinute(minutes);
            setLevelSecond(seconds);

        }
    }, [props.success]);

    useEffect(() => {
      if (!props.success) {
        start();
        setTempTime(realTime);
      }
    }, [props.success, realTime]);


  return (
    <div>
    <div className="timerBox">
        </div>
        <div className="innerTimeBox">
        {minutes> 60 ? <span>{hours}</span>:<></>}
            {minutes < 10 ? <span>0{minutes }</span>:<span>{minutes }</span>}:{seconds < 10 ? <span>0{seconds }</span>:<span>{seconds }</span>}

        </div>

    </div>
  );
}

export default Timer;