import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function NlpChart(props) {
  // const [resultList, setResultList] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [wordCount, setWordCount] = useState([]);
  const [twoWordList, setTwoWordList] = useState([]);
  const [twoWordCount, setTwoWordCount] = useState([]);
  const turkish_freq = [
    { letter: "a", freq: 11.92 },
    { letter: "b", freq: 2.844 },
    { letter: "c", freq: 0.963 },
    { letter: "ç", freq: 1.156 },
    { letter: "d", freq: 4.706 },
    { letter: "e", freq: 8.912 },
    { letter: "f", freq: 0.461 },
    { letter: "g", freq: 1.253 },
    { letter: "ğ", freq: 1.125 },
    { letter: "h", freq: 1.212 },
    { letter: "ı", freq: 5.114 },
    { letter: "i", freq: 8.6 },
    { letter: "j", freq: 0.034 },
    { letter: "k", freq: 4.683 },
    { letter: "l", freq: 5.922 },
    { letter: "m", freq: 3.752 },
    { letter: "n", freq: 7.487 },
    { letter: "o", freq: 2.476 },
    { letter: "ö", freq: 0.777 },
    { letter: "p", freq: 0.886 },
    { letter: "r", freq: 6.722 },
    { letter: "s", freq: 3.014 },
    { letter: "ş", freq: 1.78 },
    { letter: "t", freq: 3.314 },
    { letter: "u", freq: 3.235 },
    { letter: "ü", freq: 1.854 },
    { letter: "v", freq: 0.959 },
    { letter: "y", freq: 3.336 },
    { letter: "z", freq: 1.5 },
  ];
  var turkish_freq_wordList = [];
  var turkish_freq_percentage = [];
  turkish_freq.forEach((element) => {
    turkish_freq_wordList.push(element.letter);
    turkish_freq_percentage.push(element.freq);
  });
  var state = {
    labels: wordList,
    datasets: [
      {
        label: "Harf Frekansları",
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: "1",
        borderRadius: "2",
        data: wordCount,
      },
    ],
  };
  console.log("wordlist...", wordList);
  var twoWordState = {
    labels: twoWordList,
    datasets: [
      {
        label: "İkili Harf Frekansları",
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: "1",
        borderRadius: "2",
        data: twoWordCount,
      },
    ],
  };
  var turkish_freq_state = {
    labels: turkish_freq_wordList,
    datasets: [
      {
        label: "Türkçe harf frekansları",
        backgroundColor: "yellow",
        borderColor: "yellow",
        borderWidth: "1",
        borderRadius: "2",
        data: turkish_freq_percentage,
      },
    ],
  };
  var wordCountState = [];
  var twoWordCountState = [];
  useEffect(() => {
    var question = "";
    for (let i = 0; i < props.question.length; i++) {
      question += props.question[i];
    }
    console.log("question... ", question);
    countWords(question);
    countTwoWords(question);
  }, []);

  useEffect(() => {
    state = wordList;
    wordCountState = wordCount;
    twoWordState = twoWordList;
    twoWordCountState = twoWordCount;
    console.log("effect", state, wordCountState);
  }, [wordList]);

  function countWords(str, e) {
    if (wordList.length > 0) return;
    console.log("str", str);
    var resultArray = [];
    if (str.length === 0) {
      return {};
    }
    var output = {};
    var perOut = {};
    var strArr = str.split("");

    let count = 0;
    for (let i = 0; i < strArr.length; i++) {
      let word = strArr[i].toLocaleLowerCase("tr");
      if (!word.includes(" ")) {
        if (output[word] === undefined) {
          output[word] = 1;
          count++;
        } else {
          output[word] += 1;
          count += 1;
        }
      }
    }
    for (var j = 0; j < count; j++) {
      let word = strArr[j].toLocaleLowerCase("tr");
      if (!word.includes(" ")) {
        let percentage = (output[word] / count) * 100;
        perOut[word] = parseFloat(percentage.toFixed(2));
        var newObject = {
          word: word,
          count: output[word],
          percentage: perOut[word],
        };

        let resultArrayControl = false;
        if (resultArray.length === 0) {
          resultArray.push(newObject);
        } else {
          resultArray.forEach((element) => {
            if (element.word === newObject.word) {
              resultArrayControl = true;
            }
          });
          if (!resultArrayControl) {
            resultArray.push(newObject);
          }
        }
      }
    }
    setWordList([]);
    resultArray.forEach((element) => {
      //setResultList(oldArray => [...oldArray, element]);
      setWordList((oldArray) => [...oldArray, element.word]);
      setWordCount((oldArray) => [...oldArray, element.count]);
    });
    /*resultList.forEach(element => {
         setWordList(oldArray => [...oldArray, element.word]);
         setWordCount(oldArray => [...oldArray, element.count]);
       });*/
    return [resultArray];
  }
  //////////////////////////////////////////////////////////////

  function countTwoWords(str, e) {
    if (twoWordList.length > 0) return;
    console.log("str", str);
    var resultArray = [];
    if (str.length === 0) {
      return {};
    }
    var output = {};
    var perOut = {};
    var strArr = str.split("");

    let count = 0;
    for (let i = 0; i < strArr.length - 1; i++) {
      let word =
        strArr[i].toLocaleLowerCase("tr") +
        strArr[i + 1].toLocaleLowerCase("tr");
      if (!word.includes(" ")) {
        if (output[word] === undefined) {
          output[word] = 1;
          count++;
        } else {
          output[word] += 1;
          count += 1;
        }
      }
    }
    for (var j = 0; j < count; j++) {
      let word =
        strArr[j].toLocaleLowerCase("tr") +
        strArr[j + 1].toLocaleLowerCase("tr");
      if (!word.includes(" ")) {
        let percentage = (output[word] / count) * 100;
        perOut[word] = parseFloat(percentage.toFixed(2));
        var newObject = {
          word: word,
          count: output[word],
          percentage: perOut[word],
        };
        console.log("object", newObject);

        let resultArrayControl = false;
        if (resultArray.length === 0) {
          resultArray.push(newObject);
        } else {
          resultArray.forEach((element) => {
            if (element.word === newObject.word) {
              resultArrayControl = true;
            }
          });
          if (!resultArrayControl) {
            resultArray.push(newObject);
          }
        }
      }
    }
    setTwoWordList([]);
    resultArray.forEach((element) => {
      //setResultList(oldArray => [...oldArray, element]);
      setTwoWordList((oldArray) => [...oldArray, element.word]);
      setTwoWordCount((oldArray) => [...oldArray, element.count]);
    });
    //setWordList([]);
    /*resultList.forEach(element => {
         setTwoWordList(oldArray => [...oldArray, element.word]);
         setTwoWordCount(oldArray => [...oldArray, element.count]);
       });*/
    return [resultArray];
  }

  var isChartRendered = false;
  let chartContent = <div></div>;
  /*const createBarChart = (e) => {
       countWords(data.data[0].text, e);
       countTwoWords(data.data[0].text, e);
   
     }*/

  chartContent = (
    <section>
      <Bar data={state} />
      <Bar data={twoWordState} />
      <Bar data={turkish_freq_state} />

    </section>
  );
  

  return <div className="nlpFrequency">{chartContent}</div>;
}

export default NlpChart;
