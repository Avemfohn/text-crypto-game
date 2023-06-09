import React, {useState, useContext, useEffect} from 'react';
import {Link} from "react-router-dom"
import DataContext from '../../contexts/dataContext';
import UserContext from '../../contexts/userContext';

const ScoreView = (props) => {
    const [isLoggedIn, setIsLoggedIn, levelScore, setLevelScore,  levelMinute, setLevelMinute, levelSecond, setLevelSecond] = useContext(DataContext);
    const [firstPlayerName, setFirstPlayerName, secondPlayerName, setSecondPlayerName, firstPlayerScore, setFirstPlayerScore, secondPlayerScore, setSecondPlayerScore] = useContext(UserContext);
    const [pointSum, setPointSum] = useState(0);
    console.error("props.wrong...", props.gameMode);
    useEffect(() => {
        const pointSumHandler = () => {
            setPointSum(pointSum => {
                if (levelScore !== 0 && pointSum === 0) {
                    return props.point + levelScore - (props.wrong * 10);
                }
                else if (pointSum === 0) {
                    return 0;
                }
                else {
                    return props.point + pointSum + levelScore - (props.wrong * 10);
                }
            });
        }

        pointSumHandler();
    }, [props.point, levelScore]);

   useEffect(() => {
  if (props.turn) {
    var element = document.getElementsByClassName("score");
    console.log("element....", element);
    if (element && element.length > 0) {
      if (props.turn === 1) {
        element[0].classList.add("turn");
        if (element[1]) {
          element[1].classList.remove("turn");
        }
      } else {
        element[0].classList.remove("turn");
        if (element[1]) {
          element[1].classList.add("turn");
        }
      }
    }
  }
}, [props.turn]);


    return (
        <>
            {(props.gameMode === "single" || props.gameMode === "machine") ? (
              <div className="score">
                <div className='username'>
                  {isLoggedIn}
                </div>
                <div className='point'>Score: {firstPlayerScore}</div>
              </div>
            ) : (
              <div className='multiplayer'>
                <div className="score playerOne">
                  <div className='username'>
                    {firstPlayerName}
                  </div>
                  <div className='point'>Score: {firstPlayerScore}</div>
                </div>
                <div className="score playerTwo">
                  <div className='username'>
                    {secondPlayerName}
                  </div>
                  <div className='point'>Score: {secondPlayerScore}</div>
                </div>
              </div>
            )}

        </>

    );


//     if (props.gameMode === "single") {
//   return (
//     <div className="score">
//       <div className='username'>
//         {isLoggedIn}
//       </div>
//       <div className='point'>Score: {pointSum}</div>
//     </div>
//   );
// } else if (props.gameMode === "multiplayer") {
//   return (
//     <div className='multiplayer'>
//       <div className="score playerOne">
//         <div className='username'>
//           {firstPlayerName}
//         </div>
//         <div className='point'>Score: {firstPlayerScore}</div>
//       </div>
//       <div className="score playerTwo">
//         <div className='username'>
//           {secondPlayerName}
//         </div>
//         <div className='point'>Score: {secondPlayerScore}</div>
//       </div>
//     </div>
//   );
// } else if (props.gameMode === "machine") {
//   return (
//     <div className="score">
//       <div className='username'>
//         {isLoggedIn}
//       </div>
//       <div className='point'>Score: {pointSum}</div>
//     </div>
//   );
// }
}

export default ScoreView;