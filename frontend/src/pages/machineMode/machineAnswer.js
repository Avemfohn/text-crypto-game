export const machine = (cipher) => {
  const turkishFrequencies = {
    A: 11.82,
    E: 9.0,
    İ: 8.34,
    N: 7.29,
    R: 6.98,
    L: 6.07,
    I: 5.12,
    K: 4.7,
    D: 4.63,
    M: 3.71,
    Y: 3.42,
    U: 3.29,
    T: 3.27,
    S: 3.03,
    B: 2.76,
    O: 2.47,
    Ü: 1.97,
    Ş: 1.83,
    Z: 1.51,
    G: 1.32,
    Ç: 1.19,
    H: 1.11,
    Ğ: 1.07,
    V: 1.0,
    C: 0.97,
    Ö: 0.86,
    P: 0.84,
    F: 0.43,
    J: 0.03,
  };

  const turkishDigramFrequencies = {
    AR: 2273,
    LA: 2013,
    AN: 1891,
    ER: 1822,
    İN: 1674,
    LE: 1640,
    DE: 1475,
    EN: 1408,
    IN: 1377,
    DA: 1311,
    İR: 1282,
    Bİ: 1253,
    KA: 1155,
    YA: 1135,
    MA: 1044,
    Dİ: 1021,
    ND: 980,
    RA: 976,
  };

  const common_words =
    "BİR VE BU DE DA NE O GİBİ İÇİN ÇOK SONRA DAHA Kİ KADAR BEN HER DİYE DEDİ AMA HİÇ YA İLE EN VAR TÜRKİYE Mİ İKİ DEĞİL GÜN BÜYÜK BÖYLE NİN MI IN ZAMAN İN İÇİNDE OLAN BİLE OLARAK ŞİMDİ KENDİ BÜTÜN YOK NASIL ŞEY SEN BAŞKA ONUN BANA ÖNCE NIN İYİ ONU DOĞRU BENİM ÖYLE BENİ HEM HEMEN YENİ FAKAT BİZİM KÜÇÜK ARTIK İLK OLDUĞUNU ŞU KADIN KARŞI TÜRK OLDUĞU İŞTE ÇOCUK SON BİZ VARDI OLDU AYNI ADAM ANCAK OLUR ONA BİRAZ TEK BEY ESKİ YIL BUNU TAM İNSAN GÖRE UZUN İSE GÜZEL YİNE KIZ BİRİ ÇÜNKÜ GECE";

  const common_word_list = common_words.split(" ");

  const sorted_frequencies = Object.entries(turkishFrequencies).sort(
    (a, b) => b[1] - a[1]
  );

  function calculateLetterDistribution(text) {
    let letterCounts = {};
    let total = 0;

    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (char.match(/[a-zA-ZğüşıöçĞÜŞİÖÇ\s]/)) {
        char = char.toLowerCase();
        if (char in letterCounts) {
          letterCounts[char] += 1;
        } else {
          letterCounts[char] = 1;
        }
        total += 1;
      }
    }

    let letterDistribution = {};
    for (let letter in letterCounts) {
      if (letterCounts.hasOwnProperty(letter)) {
        let count = letterCounts[letter];
        let percentage = (count / total) * 100;
        letterDistribution[letter] = percentage;
      }
    }

    return letterDistribution;
  }

  //console.log(sorted_frequencies[0][0]);
  var plainPercentageText =
    "Bir bilge bir göletin başında oturmaktadır Susuzluktan kırılan bir köpeğin devamlı olarak gölete kadar gelip tam su içecekken kaçması dikkatini çeker Dikkatle izler olayı Köpek susamıştır ama gölete geldiğinde sudaki yansımasını görüp korkmaktadır Bu yüzden de suyu içmeden kaçmaktadır Sonunda köpek susuzluğa dayanamayıp kendini gölete atar ve kendi yansımasını görmediği için suyu içer O anda bilge düşünür Benim bundan öğrendiğim şu oldu der Bir insanın istekleri ile arasındaki engel çoğu zaman kendi içinde büyüttüğü korkulardır Kendi içinde büyüttüğü engellerdir İnsan bunu aşarsa istediklerini elde edebilir Ama biraz daha düşününce aslında gerçek öğrendiği şeyin bundan farklı olduğunu görür Asıl öğrendiği şey insanın bir bilge bile olsa bir köpekten öğrenebileceği bilginin var olduğudur Bu yüzden ne varsa paylaş senden de öğrenilecek bir şeyler vardır diğer insanlar için";
  var text = cipher;

  let plainLetterDistribution =
    calculateLetterDistribution(plainPercentageText);
  let letterDistribution = calculateLetterDistribution(text);

  // Sort the letters based on their percentages
  let sortedDistribution = Object.entries(letterDistribution).sort(
    (a, b) => b[1] - a[1]
  );
  let plainSortedDistribution = Object.entries(plainLetterDistribution).sort(
    (a, b) => b[1] - a[1]
  );

  text = text.toLowerCase();
  //console.log(sortedDistribution);
  //console.log(plainSortedDistribution);

  //////////////////////////////////3////////////////////////////////3
  let textLength = text.length;
  let letterFrequencyKeys = Object.keys(turkishFrequencies);

  let count = 0;
  for (let i = 0; i < 5; i++) {
    if (sortedDistribution[i][0] === " ") {
      //console.log("Space character...");
    } else {
      //console.log("Word character...", sortedDistribution[i][0], letterFrequencyKeys[count]);
      var attempt = text.replace(
        new RegExp(sortedDistribution[i][0], "g"),
        letterFrequencyKeys[count]
      );
      text = attempt;
      count += 1;
    }
  }
  /////////////////////////////////////////////4///////////////////////////////4
  count = 0;
  for (let i = 0; i < textLength; i++) {
    if (i !== textLength - 1 && text[i] === "A" && text[i + 1] === "İ") {
      count += 1;
    } else if (i !== textLength - 1 && text[i] === "E" && text[i + 1] === "İ") {
      count += 1;
    }
  }

  if (count > 1) {
    var attempt = text.replace(/İ/g, "X");
    text = attempt;
    attempt = text.replace(/N/g, "İ");
    text = attempt;
    attempt = text.replace(/X/g, "N");
    text = attempt;
  }
  //console.log(text);
  ////////////////////////////////////////////5////////////////////////////////5
  var splittedText = text.split(" ");
  let aCount = 0;
  let eCount = 0;
  let iCount = 0;
  let nCount = 0;

  for (let i = 0; i < splittedText.length; i++) {
    let twoLetterWord = splittedText[i];
    if (twoLetterWord.length === 2) {
      //console.log(`Found a word with exactly two letters: ${twoLetterWord[1]}`);
      if (twoLetterWord[1] === "A") {
        aCount += 1;
      } else if (twoLetterWord[1] === "E") {
        eCount += 1;
      } else if (twoLetterWord[1] === "İ") {
        iCount += 1;
      } else if (twoLetterWord[1] === "N") {
        nCount += 1;
      }
    }
  }

  let letterCounts = { A: aCount, E: eCount, İ: iCount, N: nCount };
  let mostFrequentLetter = Object.keys(letterCounts).reduce((a, b) =>
    letterCounts[a] > letterCounts[b] ? a : b
  );
  var attempt = text.replace(new RegExp(mostFrequentLetter, "g"), "X");
  text = attempt;
  attempt = text.replace(/E/g, mostFrequentLetter);
  text = attempt;
  attempt = text.replace(/X/g, "E");
  text = attempt;

  ///////////////////////////////////////////6/////////////////////////////////6
  let llList = [];

  for (let i = 0; i < textLength; i++) {
    if (text[i] === text[i - 1] && text[i] === "N") {
      //console.log(text[i], text[i - 1]);
      var attempt = text.replace(/N/g, "L");
      text = attempt;
    }
  }
  //////////////////////////////////////////7///////////////////////////////////7

  for (let i = 0; i < splittedText.length; i++) {
    let threeLetterWord = splittedText[i];
    if (threeLetterWord.length === 3) {
      //console.log(`Found a word with exactly three letters: ${threeLetterWord}`);
      if (threeLetterWord[0] === "A" && threeLetterWord[2] === "A") {
        //console.log("found AMA...");
        var attempt = text.replace(new RegExp(threeLetterWord[1], "g"), "M");
        text = attempt;
      }
    }
  }

  //console.log(text);
  ///////////////////////////////////////////8///////////////////////////////////8
  let twoLetterList = [];

  for (let i = 1; i < textLength; i++) {
    if (
      text[i - 1] === "A" &&
      text[i] !== " " &&
      i !== textLength - 1 &&
      text[i].toUpperCase() !== text[i]
    ) {
      twoLetterList.push(text[i - 1] + text[i]);
    }
  }

  var counter = {};
  for (let i = 0; i < twoLetterList.length; i++) {
    let key = twoLetterList[i];
    counter[key] = (counter[key] || 0) + 1;
  }

  let sortedData = Object.entries(counter).sort((a, b) => {
    if (b[1] === a[1]) {
      return a[0].localeCompare(b[0]);
    }
    return b[1] - a[1];
  });

  //console.log(sortedData);
  if (sortedData.length > 0) {
    if (sortedData[0][1] - sortedData[1][1] >= 1) {
        console.log("qewr", sortedData[0][0][1]);
        var attempt = text.replace(new RegExp(sortedData[0][0][1], "g"), "R");
        text = attempt;
        //console.error(attempt);
    }
  }

  //console.log(text);

  /////////////////////////////////////////////9///////////////////////////////////9
  let text_length = text.length;
  let three_letter_den_control = [];
  let two_letter_de_control = [];
  let l_count = [];
  for (let i = 0; i < text_length; i++) {
    let isUpper = text[i][0] === text[i][0].toUpperCase();
    if (!isUpper && text[i + 1][0] === "E" && text[i + 2][0] === "N") {
      three_letter_den_control.push(
        text[i][0] + text[i + 1][0] + text[i + 2][0]
      );
    }
    if (i + 2 < text_length) {
      if (!isUpper && text[i + 1][0] === "A" && text[i + 2][0] === "R") {
        l_count.push(text[i][0]);
      }
      if (!isUpper && text[i + 1][0] === "E" && text[i + 2][0] === "R") {
        l_count.push(text[i][0]);
      }
    }
  }
  //console.log(l_count);
  var counter = {};
  l_count.forEach((item) => {
    counter[item] = (counter[item] || 0) + 1;
  });
  let sorted_l_count = Object.entries(counter).sort((a, b) => b[1] - a[1]);
  //console.log(sorted_l_count);
  if (sorted_l_count.length > 0) {
    if (sorted_l_count[0][1] - sorted_l_count[1][1] > 2) {
      var attempt = text.replace(new RegExp(sorted_l_count[0][0], "g"), "L");
      text = attempt;
    }
  }
  let splitted_text = text.split(" ");
  splitted_text.forEach((two_letter_word) => {
    if (two_letter_word.length === 2) {
      if (two_letter_word[1] === "E") {
        two_letter_de_control.push(two_letter_word);
      }
    }
  });
  //console.log(three_letter_den_control);
  //console.log(two_letter_de_control);
  three_letter_den_control.forEach((three) => {
    two_letter_de_control.forEach((two) => {
      if (two[0] === three[0] && two[1] === three[1]) {
        console.log("Found a match!");
        var attempt = text.replace(new RegExp(two[0], "g"), "D");
        text = attempt;
      }
    });
  });
  //////////////////////////////////////////////10///////////////////////////////////10
  var splittedText = text.split(" ");
  var lower_word = "";
  var match_count = 0;
  
  for (let i = 0; i < common_word_list.length; i++) {
    if (common_word_list[i].length === 3) {
      for (let j = 0; j < splitted_text.length; j++) {
        let isLower = 0;
        let three_letter_word = splitted_text[j];
        
        if (three_letter_word.length === 3) {
          if (/[\u0061-\u007A\u00E7\u011F\u0131\u015F\u00F6\u00FC]/.test(three_letter_word)) {
            isLower = 1;
          }
          
          let count = 0;
          if (common_word_list[i][0] === three_letter_word[0]) {
            count += 1;
          }
          if (common_word_list[i][1] === three_letter_word[1]) {
            count += 1;
          }
          if (common_word_list[i][2] === three_letter_word[2]) {
            count += 1;
          }
          
          if (count >= 2 && isLower === 1) {
            match_count += 1;
            for (let k = 0; k < 3; k++) {
              if (/[\u0061-\u007A\u00E7\u011F\u0131\u015F\u00F6\u00FC]/.test(three_letter_word[k])) {
                lower_word = three_letter_word[k];
                var index = k;
              }
            }
          }
        }
      }
    }
    
    if (match_count > 2) {
        //console.log(lower_word)
      let regex = new RegExp(lower_word, "g");
      text = text.replace(regex, common_word_list[i][index]);
    }
  }
  //console.log(text)


  //////////////////////////////////////////////11///////////////////////////////////11
  var splittedText = text.split(" ");
  var lower_word = "";
  var match_count = 0;
  console.log(splittedText)
  for (let i = 0; i < common_word_list.length; i++) {
    match_count = 0;
    
    if (common_word_list[i].length === 2) {
      for (let j = 0; j < splitted_text.length; j++) {
        var two_letter_word = splitted_text[j];
        if (two_letter_word.length === 2) {
            console.log(two_letter_word)
          if (/[A-ZÇĞÖŞÜ]/.test(two_letter_word)) {
            let isLower_twoLetter = 1;
            
            if (two_letter_word[1] === 'E' && two_letter_word[0] !== two_letter_word[0].toLocaleUpperCase("tr")) {
              let regex = new RegExp(two_letter_word[0], "g");
              text = text.replace(regex, 'V');
            }
            
            if (two_letter_word[0] === 'B') {
              //console.log(two_letter_word)
              let regex = new RegExp(two_letter_word[1], "g");
              text = text.replace(regex, 'U');
            }
          }
        }
      }
    }
  }
  
  //console.log(text)

   //////////////////////////////////////////////12///////////////////////////////////12

   function four_letter_common_words(text) {
    let splitted_text = text.split(" ");
    var lower_word = "";
    var match_count = 0;
  
    for (let i = 0; i < common_word_list.length; i++) {
      match_count = 0;
  
      if (common_word_list[i].length === 4) {
        for (let j = 0; j < splitted_text.length; j++) {
          let four_letter_word = splitted_text[j];
          let isLower_fourLetter = 0;
  
          if (four_letter_word.length === 4) {
            if (/[a-zçğıöşü]/i.test(four_letter_word)) {
              isLower_fourLetter = 1;
            }
  
            let count_fourLetter = 0;
            let wrong_fourLetter_word = "";
            let correct_fourLetter_word = "";
  
            if (common_word_list[i][0] === four_letter_word[0]) {
              count_fourLetter += 1;
            } else {
              wrong_fourLetter_word = four_letter_word[0];
              correct_fourLetter_word = common_word_list[i][0];
            }
  
            if (common_word_list[i][1] === four_letter_word[1]) {
              count_fourLetter += 1;
            } else {
              wrong_fourLetter_word = four_letter_word[1];
              correct_fourLetter_word = common_word_list[i][1];
            }
  
            if (common_word_list[i][2] === four_letter_word[2]) {
              count_fourLetter += 1;
            } else {
              wrong_fourLetter_word = four_letter_word[2];
              correct_fourLetter_word = common_word_list[i][2];
            }
  
            if (common_word_list[i][3] === four_letter_word[3]) {
              count_fourLetter += 1;
            } else {
              wrong_fourLetter_word = four_letter_word[3];
              correct_fourLetter_word = common_word_list[i][3];
            }
  
            if (count_fourLetter >= 3 && isLower_fourLetter === 1) {
              //console.log(i, four_letter_word, wrong_fourLetter_word, correct_fourLetter_word);
              let regex = new RegExp(wrong_fourLetter_word, "g");
              text = text.replace(regex, correct_fourLetter_word);
            }
          }
        }
      }
    }
  
    return text;
  }
  
  text = four_letter_common_words(text);
  //console.log(text);
   //////////////////////////////////////////////13///////////////////////////////////13
   function fiveLetterCommonWords(text) {
    const commonWordList = common_words.split(" ");
    var splittedText = text.split(" ");
    
    for (let i = 0; i < commonWordList.length; i++) {
      let currentWord = commonWordList[i];
      
      if (currentWord.length === 5) {
        for (let j = 0; j < splittedText.length; j++) {
          let fiveLetterWord = splittedText[j];
          let isLowerFiveLetter = 0;
          
          if (fiveLetterWord.length === 5) {
            if (/[a-zçğıöşü]/i.test(fiveLetterWord)) {
              isLowerFiveLetter = 1;
            }
            
            let countFiveLetter = 0;
            let wrongFiveLetterWord = "";
            let correctFiveLetterWord = "";
            
            if (currentWord[0] === fiveLetterWord[0]) {
              countFiveLetter += 1;
            } else {
              wrongFiveLetterWord = fiveLetterWord[0];
              correctFiveLetterWord = currentWord[0];
            }
            
            if (currentWord[1] === fiveLetterWord[1]) {
              countFiveLetter += 1;
            } else {
              wrongFiveLetterWord = fiveLetterWord[1];
              correctFiveLetterWord = currentWord[1];
            }
            
            if (currentWord[2] === fiveLetterWord[2]) {
              countFiveLetter += 1;
            } else {
              wrongFiveLetterWord = fiveLetterWord[2];
              correctFiveLetterWord = currentWord[2];
            }
            
            if (currentWord[3] === fiveLetterWord[3]) {
              countFiveLetter += 1;
            } else {
              wrongFiveLetterWord = fiveLetterWord[3];
              correctFiveLetterWord = currentWord[3];
            }
            
            if (currentWord[4] === fiveLetterWord[4]) {
              countFiveLetter += 1;
            } else {
              wrongFiveLetterWord = fiveLetterWord[4];
              correctFiveLetterWord = currentWord[4];
            }
            
            if (countFiveLetter >= 4 && isLowerFiveLetter === 1 && wrongFiveLetterWord !== wrongFiveLetterWord.toLocaleUpperCase("tr")) {
              console.log(wrongFiveLetterWord, correctFiveLetterWord)
              let regex = new RegExp(wrongFiveLetterWord, "g");
              text = text.replace(regex, correctFiveLetterWord);
            }
          }
        }
      }
    }
    
    return text;
  }
  
  text = fiveLetterCommonWords(text);
   //////////////////////////////////////////////14///////////////////////////////////14
  var splittedText = text.split(" ");
  let wordCountList = [];

  for (let word of splittedText) {
    if (word.length > 4) {
      let length = word.length;
      if (
        word[length - 1] === "İ" &&
        word[length - 3] === "İ" &&
        word[length - 4] === "D" &&
        word[length - 2].toLowerCase() === word[length - 2]
      ) {
        let attempt = text.replaceAll(word[length - 2], "Ğ");
        text = attempt;
      }
    }
    if (word.length > 3) {
      if (
        word[word.length - 1] === "R" &&
        word[word.length - 3] === "D" &&
        word[word.length - 2].toLowerCase() === word[word.length - 2]
      ) {
        wordCountList.push(word[word.length - 2]);
        console.log("qqq", word, word[word.length - 2]);
      }
    }
  }

  var counter = {};
  wordCountList.forEach((word) => {
    counter[word] = (counter[word] || 0) + 1;
  });

  let sortedLstI = Object.entries(counter).sort((a, b) => b[1] - a[1]);

  if (sortedLstI.length > 0) {
    let attempt = text.replace(new RegExp(sortedLstI[0][0], "g"), "I");
    text = attempt;
  }


   //////////////////////////////////////////////15///////////////////////////////////15
    let newList = [];
    text = fiveLetterCommonWords(text);
    for (let i = 2; i < textLength; i++) {
      if (
        text[i - 2].toLocaleLowerCase("tr") === text[i - 2] &&
        text[i - 2] === text[i] &&
        !/[AEIİUO]/i.test(text[i + 1])
      ) {
        newList.push(text[i]);
      }
    }

    var counter = {};
    newList.forEach((char) => {
      counter[char] = (counter[char] || 0) + 1;
    });

    sortedData = Object.entries(counter).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

    if (sortedData.length > 0) {
      console.log(sortedData)
      let attempt = text.replaceAll(sortedData[0][0], "Ü");
      text = attempt;
    }


   //////////////////////////////////////////////16///////////////////////////////////16
  var splittedText = text.split(" ");
  let oCount = 0;

  for (let i = 0; i < splittedText.length; i++) {
    if (splittedText[i].length === 1) {
      console.log(splittedText[i]);
      let attempt = text.replaceAll(splittedText[i], "O");
      text = attempt;
    }

    for (let i = 0; i < splittedText.length; i++) {
      if (
        splittedText[i][splittedText[i].length - 1] === "R" &&
        splittedText[i][splittedText[i].length - 2] === "O" &&
        splittedText[i][splittedText[i].length - 3].toLowerCase() === splittedText[i][splittedText[i].length - 3]
      ) {
        console.log(splittedText[i][splittedText[i].length - 3]);
        let attempt = text.replaceAll(splittedText[i][splittedText[i].length - 3], "Y");
        text = attempt;
      }
    }
    
  }

  for (let j = 0; j < text.length; j++) {
    if (text[j] === "O") {
      oCount++;
    }
  }

  if (oCount === 0) {
    let oList = [];

    for (let k = 0; k < splittedText.length; k++) {
      if (splittedText[k][0].toLowerCase() === splittedText[k][0] && splittedText[k][1] === "L") {
        oList.push(splittedText[k][0]);
      }
    }

    let counter = {};
    oList.forEach((char) => {
      counter[char] = (counter[char] || 0) + 1;
    });

    let sortedData = Object.entries(counter).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

    if (sortedData.length > 0) {
      let attempt = text.replaceAll(sortedData[0][0], "O");
      text = attempt;
    }
  }

  //console.log(text);

   //////////////////////////////////////////////17///////////////////////////////////17
   //Ö
  for (let i = 0; i < splittedText.length; i++) {
    if (splittedText[i][0].toLowerCase() === splittedText[i][0] && splittedText[i][1] === "Ğ") {
      let attempt = text.replaceAll(splittedText[i][0], "Ö");
      text = attempt;
    }
  }
    
  text = four_letter_common_words(text);
  console.log(text);
  
   //////////////////////////////////////////////18///////////////////////////////////18
   //YOR "Y"
   var splittedText = text.split(" ");

  for (let i = 0; i < splittedText.length; i++) {
    if (
      splittedText[i][splittedText[i].length - 1] === "R" &&
      splittedText[i][splittedText[i].length - 2] === "O" &&
      splittedText[i][splittedText[i].length - 3].toLowerCase() === splittedText[i][splittedText[i].length - 3]
    ) {
      console.log(splittedText[i][splittedText[i].length - 3]);
      let attempt = text.replaceAll(splittedText[i][splittedText[i].length - 3], "Y");
      text = attempt;
    }
  }
  text = text.replaceAll(/\u0307/g, '');
  return text
  //console.log(text);
   //////////////////////////////////////////////19///////////////////////////////////19
   //K
  /*var splittedText = text.split(" ");
  let kList = [];

  for (let i = 0; i < splittedText.length; i++) {
    if (splittedText[i].length > 4) {
      for (let index = 1; index < splittedText[i].length - 1; index++) {
        if (
          splittedText[i][index].toLowerCase() === splittedText[i][index] &&
          splittedText[i][index + 1] === "L" &&
          splittedText[i][index - 1] === "A"
        ) {
          kList.push(splittedText[i][index]);
        } else if (
          splittedText[i][index].toLowerCase() === splittedText[i][index] &&
          splittedText[i][index + 1] === "L" &&
          splittedText[i][index - 1] === "R"
        ) {
          console.log(splittedText[i]);
          kList.push(splittedText[i][index]);
        }
      }
    }
  }

  var counter = {};
  kList.forEach((char) => {
    counter[char] = (counter[char] || 0) + 1;
  });

  var attempt;
  if (text.includes("K")) {
    console.log("K found...");
  } else {
    let sortedData = Object.entries(counter).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    attempt = text.replaceAll(sortedData[0][0], "K");
  }

  text = attempt;

  console.log(text)*/



   //////////////////////////////////////////////20///////////////////////////////////20

}
//console.log(plainText);
