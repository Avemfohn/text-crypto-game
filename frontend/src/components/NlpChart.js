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
  const [threeWordList, setThreeWordList] = useState([]);
  const [threeWordCount, setThreeWordCount] = useState([]);
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
  const turkish_digram_freq = [
    { letter: "ar", freq: 0.02273 },
    { letter: "la", freq: 0.02013 },
    { letter: "an", freq: 0.01891 },
    { letter: "er", freq: 0.01822 },
    { letter: "in", freq: 0.01674 },
    { letter: "le", freq: 0.01640 },
    { letter: "de", freq: 0.01475 },
    { letter: "en", freq: 0.01408 },
    { letter: "ın", freq: 0.01377 },
    { letter: "da", freq: 0.01311 },
    { letter: "ir", freq: 0.01282 },
    { letter: "bi", freq: 0.01253 },
    { letter: "ka", freq: 0.01155 },
    { letter: "ya", freq: 0.01135 },
    { letter: "ma", freq: 0.01044 },
    { letter: "di", freq: 0.01021 },
    { letter: "nd", freq: 0.00980 },
    { letter: "ra", freq: 0.00976 },
    { letter: "al", freq: 0.00974 },
    { letter: "ak", freq: 0.00967 },
    { letter: "il", freq: 0.00870 },
    { letter: "ri", freq: 0.00860 },
    { letter: "me", freq: 0.00785 },
    { letter: "li", freq: 0.00782 },
    { letter: "or", freq: 0.00782 },
    { letter: "ne", freq: 0.00738 },
    { letter: "rı", freq: 0.00733 },
    { letter: "ba", freq: 0.00718 },
    { letter: "ni", freq: 0.00716 },
  ];
  const turkish_trigram_freq = [
    { letter: "lar", freq: 0.01237 },
    { letter: "bir", freq: 0.00952 },
    { letter: "ler", freq: 0.00949 },
    { letter: "eri", freq: 0.00764 },
    { letter: "arı", freq: 0.00757 },
    { letter: "yor", freq: 0.00643 },
    { letter: "ara", freq: 0.00521 },
    { letter: "nda", freq: 0.00482 },
    { letter: "ini", freq: 0.00432 },
    { letter: "ını", freq: 0.00428 },
    { letter: "ası", freq: 0.00387 },
    { letter: "den", freq: 0.00383 },
    { letter: "nde", freq: 0.00383 },
    { letter: "rin", freq: 0.00372 },
    { letter: "ile", freq: 0.00367 },
    { letter: "anı", freq: 0.00362 },
    { letter: "ama", freq: 0.00357 },
    { letter: "rın", freq: 0.00345 },
    { letter: "nla", freq: 0.00338 },
    { letter: "dan", freq: 0.00338 },
    { letter: "ınd", freq: 0.00336 },
    { letter: "edi", freq: 0.00326 },
    { letter: "ada", freq: 0.00321 },
    { letter: "aya", freq: 0.00316 },
    { letter: "kar", freq: 0.00299 },
    { letter: "ala", freq: 0.00298 },
    { letter: "lan", freq: 0.00296 },
    { letter: "eni", freq: 0.00294 },
    { letter: "sın", freq: 0.00294 },
  ];
  var turkish_freq_wordList = [];
  var turkish_freq_percentage = [];
  turkish_freq.forEach((element) => {
    turkish_freq_wordList.push(element.letter);
    turkish_freq_percentage.push(element.freq);
  });

  var turkish_digram_freq_wordList = [];
  var turkish_digram_freq_percentage = [];
  turkish_digram_freq.forEach((element) => {
    turkish_digram_freq_wordList.push(element.letter);
    turkish_digram_freq_percentage.push(element.freq);
  });

  var turkish_trigram_freq_wordList = [];
  var turkish_trigram_freq_percentage = [];
  turkish_trigram_freq.forEach((element) => {
    turkish_trigram_freq_wordList.push(element.letter);
    turkish_trigram_freq_percentage.push(element.freq);
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
  var threeWordState = {
    labels: threeWordList,
    datasets: [
      {
        label: "Üçlü Harf Frekansları",
        backgroundColor: "gray",
        borderColor: "gray",
        borderWidth: "1",
        borderRadius: "2",
        data: threeWordCount,
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
  var turkish_digram_freq_state = {
    labels: turkish_digram_freq_wordList,
    datasets: [
      {
        label: "Türkçe ikili harf frekansları",
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: "1",
        borderRadius: "2",
        data: turkish_digram_freq_percentage,
      },
    ],
  };
  var turkish_trigram_freq_state = {
    labels: turkish_trigram_freq_wordList,
    datasets: [
      {
        label: "Türkçe üçlü harf frekansları",
        backgroundColor: "black",
        borderColor: "black",
        borderWidth: "1",
        borderRadius: "2",
        data: turkish_trigram_freq_percentage,
      },
    ],
  };
  var wordCountState = [];
  var twoWordCountState = [];
  var threeWordCountState = [];

  useEffect(() => {
    var question = "";
    console.log(props.question)
    for (let i = 0; i < props.question.length; i++) {
      question += props.question[i];
    }
    countWords(question);
    countTwoWords(question);
    countThreeWords(question);
    
  }, []);

  useEffect(() => {
    state = wordList;
    wordCountState = wordCount;
    twoWordState = twoWordList;
    twoWordCountState = twoWordCount;
    threeWordState = threeWordList;
    threeWordCountState = threeWordCount;
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
    console.error("resultArray", resultArray)
    resultArray.forEach((element) => {
      //setResultList(oldArray => [...oldArray, element]);
      setWordList((oldArray) => [...oldArray, element.word]);
      setWordCount((oldArray) => [...oldArray, element.percentage]);
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
      setTwoWordCount((oldArray) => [...oldArray, element.percentage]);
    });
    //setWordList([]);
    /*resultList.forEach(element => {
         setTwoWordList(oldArray => [...oldArray, element.word]);
         setTwoWordCount(oldArray => [...oldArray, element.count]);
       });*/
    return [resultArray];
  }

  function countThreeWords(str, e) {
    if (threeWordList.length > 0) return;
    console.log("str", str);
    var resultArray = [];
    if (str.length === 0) {
      return {};
    }
    var output = {};
    var perOut = {};
    var strArr = str.split("");

    let count = 0;
    for (let i = 0; i < strArr.length - 2; i++) {
      let word =
        strArr[i].toLocaleLowerCase("tr") +
        strArr[i + 1].toLocaleLowerCase("tr") +
        strArr[i + 2].toLocaleLowerCase("tr");
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
        strArr[j + 1].toLocaleLowerCase("tr") +
        strArr[j + 2].toLocaleLowerCase("tr");

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
    setThreeWordList([]);
    resultArray.forEach((element) => {
      //setResultList(oldArray => [...oldArray, element]);
      setThreeWordList((oldArray) => [...oldArray, element.word]);
      setThreeWordCount((oldArray) => [...oldArray, element.percentage]);
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
      <Bar data={turkish_freq_state} />
      <Bar data={state} />
      <Bar data={turkish_digram_freq_state} />
      <Bar data={twoWordState} />
      <Bar data={turkish_trigram_freq_state} />
      <Bar data={threeWordState} />



    </section>
  );
  

  return <div className="nlpFrequency">
    {chartContent}
    <div className="digrams"> 
      <div className="digramWordEndings">
        <p className="digramsHeader">İkili Harf Başlangıçları:</p>
        <p>
          AN EN İN AR IN DA ER DE İD AK LE Nİ NA NE
          NU İM DI Rİ RI OR EK YE RA DU UN YA Kİ İR LA IM Li
          Sİ IK IR LI ET TI Tİ CE SI UM IŞ RE ĞI İZ İK İŞ MA IZ Bİ (%73)
        </p>
      </div>
      <div className="digramWordBeginnings">
        <p className="digramsHeader">İkili harf bitişleri:</p>
        <p>
          Bİ KA YA DE BA BU GE VE OL DA HA SA BE GÖ SO KO TA Gİ SE
          NE HE AL GÜ YE AN Dİ İÇ KE Kİ AR TE ÇO DÜ KU İN VA İS ME
          KI DO PA ON İL ÇA DU YO MA TÜ ÇI Mİ (%67.3)
        </p>
      </div>
    </div>
    <div className="trigrams"> 
      <div className="trigramWordBeginnings">
        <p className="trigramsHeader">Üçlü harf başlangıçları:</p>
        <p>
          BİR BAŞ İÇİ KAR GEL GÖR SON BEN OLA KAD YAP BİL KAL VER 
          KEN ÇIK DEĞ VAR GÜN YAN GİB İST BAK DİY TÜR HER ARA OLM 
          DED ÇOK DÜŞ DAH BUN GER OLD YER KON GEÇ PAR DUR KUR VİZ ANL ÇOC
          YAR YIL BUL SEN OLU YOK (%30.6)
        </p>
      </div>
      <div className="trigramWordEndings">
        <p className="trigramsHeader">Üçlü harf bitişleri:</p>
        <p>
          LAR DAN LER DEN YOR ARI INI NDA İNİ ERİ İNE INA NDE NIN NİN RDU
          YLE MIŞ AYA ASI MİŞ RAK IĞI RIN CAK ESİ RDI ARA İYE NRA MAK MEK 
          TAN İĞİ DAR RİN EYE MAN LIK RUM UNU ADA RDİ ADI KEN DIR TEN DİR LİK YLA (%41.6)
        </p>
      </div>
    </div>
    <div className="commonWords">
      <p className="commonWordsHeader">En Çok Kullanılan Kelimeler:</p>
      <p>BİR VE BU DE DA NE O GİBİ İÇİN ÇOK SONRA DAHA Kİ KADAR
      BEN HER DİYE DEDİ AMA HİÇ YA İLE EN VAR TÜRKİYE Mİ İKİ DEĞİL
      GÜN BÜYÜK BÖYLE NİN MI IN ZAMAN İN İÇİNDE OLAN BİLE OLARAK 
      ŞİMDİ KENDİ BÜTÜN YOK NASIL ŞEY SEN BAŞKA ONUN BANA ÖNCE NIN İYİ
      ONU DOĞRU BENİM ÖYLE BENİ HEM HEMEN YENİ FAKAT BİZİM KÜÇÜK ARTIK 
      İLK OLDUĞUNU ŞU KADIN KARŞI TÜRK OLDUĞU İŞTE ÇOCUK SON BİZ VARDU OLDU
      AYNI ADAM ANCAK OLUR ONA BİRAZ TEK BEY ESKİ YIL BUNU TAM 
      İNSAN GÖRE UZUN İSE GÜZEL YİNE KIZ BİRİ ÇÜNKÜ GECE (%23)
      </p>
    </div>
    
    
    </div>;
}

export default NlpChart;
