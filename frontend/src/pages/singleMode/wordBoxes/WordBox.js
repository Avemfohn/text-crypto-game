import React, {useState} from 'react';

const WordBox = (props) => {
    function inputFilled(e) {
        console.log(e.target.value);
        var elements = document.getElementsByClassName("transparentWord");
        props.inputFilled(e.target.value, props.correctLetter.toLocaleUpperCase("tr"), props.word);
    }

    let content;
    switch (props.type) {
        case "knownWord":
            content =  <div>
                <p className='transparentWord'>{props.word}</p>
                <li className='wordBox word' id={props.id}>{props.value}</li>
            </div>
            break;
        case "unknownWord":
            content =  <div>
                <p className='transparentWord'>{props.word}</p>
                <li className='wordBox' id={props.id}>
                    <input type='text' className='wordInput' onChange={inputFilled}></input>
                </li>
            </div>
            break;
        case "specialCharacter":
            content =  <div>
                <p className='transparentWord'>{props.word}</p>
                <li className='wordBox word' id={props.word}>{props.word}</li>
            </div>
            break;
        default:
            break;
    }
    return (
        <>
          {content}  
        </>
    );
}
  
export default WordBox;
  