    #!/usr/bin/env python
    # coding: utf-8

    # In[49]:

class CiphertextSolver:
    @classmethod
    def solve_ciphertext(cls, ciphertext):

        turkish_frequencies = {
            'A': 11.82, 'E': 9.00, 'İ': 8.34, 'N': 7.29, 'R': 6.98, 'L': 6.07, 'I': 5.12, 'K': 4.70, 'D': 4.63, 'M': 3.71,
            'Y': 3.42, 'U': 3.29, 'T': 3.27, 'S': 3.03, 'B': 2.76, 'O': 2.47, 'Ü': 1.97, 'Ş': 1.83, 'Z': 1.51, 'G': 1.32,
            'Ç': 1.19, 'H': 1.11, 'Ğ': 1.07, 'V': 1.00, 'C': 0.97, 'Ö': 0.86, 'P': 0.84, 'F': 0.43, 'J': 0.03,

        }
        turkish_digram_frequencies = {
            'AR': 2273, 'LA': 2013, 'AN': 1891, 'ER': 1822, 'İN': 1674, 'LE': 1640, 'DE': 1475, 'EN': 1408, 'IN': 1377,
            'DA': 1311, 'İR': 1282, 'Bİ': 1253, 'KA': 1155, 'YA': 1135, 'MA': 1044, 'Dİ': 1021, 'ND': 980, 'RA': 976,
        }
        common_words = "BİR VE BU DE DA NE O GİBİ İÇİN ÇOK SONRA DAHA Kİ KADAR BEN HER DİYE DEDİ AMA HİÇ YA İLE EN VAR TÜRKİYE Mİ İKİ DEĞİL GÜN BÜYÜK BÖYLE NİN MI IN ZAMAN İN İÇİNDE OLAN BİLE OLARAK ŞİMDİ KENDİ BÜTÜN YOK NASIL ŞEY SEN BAŞKA ONUN BANA ÖNCE NIN İYİ ONU DOĞRU BENİM ÖYLE BENİ HEM HEMEN YENİ FAKAT BİZİM KÜÇÜK ARTIK İLK OLDUĞUNU ŞU KADIN KARŞI TÜRK OLDUĞU İŞTE ÇOCUK SON BİZ VARDI OLDU AYNI ADAM ANCAK OLUR ONA BİRAZ TEK BEY ESKİ YIL BUNU TAM İNSAN GÖRE UZUN İSE GÜZEL YİNE KIZ BİRİ ÇÜNKÜ GECE"
                     ##23%
        common_word_list = common_words.split()

        sorted_frequencies = sorted(turkish_frequencies.items(), key=lambda x: x[1], reverse=True)

        print(sorted_frequencies[0][0])


        # In[50]:


        from langdetect import detect


        # In[51]:


        def calculate_letter_distribution(text):
            letter_counts = {}
            total = 0

            for char in text:
                if char.isalpha() or char.isspace():
                    char = char.lower()
                    if char in letter_counts:
                        letter_counts[char] += 1
                    else:
                        letter_counts[char] = 1
                    total += 1

            letter_distribution = {}
            for letter, count in letter_counts.items():
                percentage = (count / total) * 100
                letter_distribution[letter] = percentage

            return letter_distribution

        # Example usage
        # Bir bilge bir göletin başında oturmaktadır. Susuzluktan kırılan bir köpeğin devamlı olarak gölete kadar gelip tam su içecekken kaçması dikkatini çeker Dikkatle izler olayı Köpek susamıştır ama gölete geldiğinde sudaki yansımasını görüp korkmaktadır Bu yüzden de suyu içmeden kaçmaktadır Sonunda köpek susuzluğa dayanamayıp kendini gölete atar ve kendi yansımasını görmediği için suyu içer O anda bilge düşünür Benim bundan öğrendiğim şu oldu der Bir insanın istekleri ile arasındaki engel, çoğu zaman kendi içinde büyüttüğü korkulardır Kendi içinde büyüttüğü engellerdir İnsan bunu aşarsa istediklerini elde edebilir Ama biraz daha düşününce aslında gerçek öğrendiği şeyin bundan farklı olduğunu görür Asıl öğrendiği şey insanın bir bilge bile olsa bir köpekten öğrenebileceği bilginin var olduğudur Bu yüzden ne varsa paylaş senden de öğrenilecek bir şeyler vardır diğer insanlar için
        plain_percentage_text = "Bir bilge bir göletin başında oturmaktadır. Susuzluktan kırılan bir köpeğin devamlı olarak gölete kadar gelip tam su içecekken kaçması dikkatini çeker Dikkatle izler olayı Köpek susamıştır ama gölete geldiğinde sudaki yansımasını görüp korkmaktadır Bu yüzden de suyu içmeden kaçmaktadır Sonunda köpek susuzluğa dayanamayıp kendini gölete atar ve kendi yansımasını görmediği için suyu içer O anda bilge düşünür Benim bundan öğrendiğim şu oldu der Bir insanın istekleri ile arasındaki engel, çoğu zaman kendi içinde büyüttüğü korkulardır Kendi içinde büyüttüğü engellerdir İnsan bunu aşarsa istediklerini elde edebilir Ama biraz daha düşününce aslında gerçek öğrendiği şeyin bundan farklı olduğunu görür Asıl öğrendiği şey insanın bir bilge bile olsa bir köpekten öğrenebileceği bilginin var olduğudur Bu yüzden ne varsa paylaş senden de öğrenilecek bir şeyler vardır diğer insanlar için"
        #text = "Dlt dloığ dlt ısoğvlp dçükpgç rvytöçnvçgkt Uyuycoynvçp nktkoçp dlt nsşğilp gğaçöok roçtçn ısoğvğ nçgçt ığolş vçö uy lfğeğnnğp nçföçuk glnnçvlpl fğnğt Glnnçvoğ lcoğt roçbk Nsşğn uyuçöküvkt çöç ısoğvğ ığoglilpgğ uygçnl bçpuköçukpk ıstzş nrtnöçnvçgkt Dy bzcgğp gğ uyby lföğgğp nçföçnvçgkt Urpypgç nsşğn uyuycoyiç gçbçpçöçbkş nğpglpl ısoğvğ çvçt ağ nğpgl bçpuköçukpk ıstöğglil lflp uyby lfğt R çpgç dloığ gzüzpzt Dğplö dypgçp sitğpglilö üy rogy gğt Dlt lpuçpkp luvğnoğtl loğ çtçukpgçnl ğpığo, friy cçöçp nğpgl lflpgğ dzbzvvziz nrtnyoçtgkt Nğpgl lflpgğ dzbzvvziz ğpığooğtglt İpuçp dypy çüçtuç luvğglnoğtlpl ğogğ ğgğdlolt Çöç dltçc gçjç gzüzpzpeğ çuokpgç ığtfğn sitğpglil üğblp dypgçp hçtnok rogyiypy ıstzt Çuko sitğpglil üğb lpuçpkp dlt dloığ dloğ rouç dlt nsşğnvğp sitğpğdloğeğil dloılplp açt rogyiygyt Dy bzcgğp pğ açtuç şçboçü uğpgğp gğ sitğploğeğn dlt üğboğt açtgkt gliğt lpuçpoçt lflp"
        #plain_percentage_text = "Nisan ayının gelmesiyle bahar kendisini hissettirmeye başlar Soğuk havalar geride kalır yerini serin zaman zaman da ılık güzel havalar alır Tabiatta canlılık başlar Bütün canlılar yeni bir hayata başlamanın hazırlı­ğı İçindedir Tabiat kışlık beyaz elbiselerini çıkarır yerine yeşil elbiseler gi­yer Nisan ayında yağmur çok yağar Buna halk arasında Nisan Yağmurla­rı denir Bu ayda yağmur sık sık yağar ama kısa sürer Nisan ayı bütün canlılara yaşama sevinci verir insanı hayata bağlar Sabah erkenden kalkıp pencereyi açıp kuşların şarkılarını dinlemek insanı mutlu eder Her yanda bahar kokusu ve bahar temizliği vardır Büyük şehirlerde nisanı fark etmek zordur Şehir insanı cansız ve yüksek beton binalardan başka bir şey görmez"
        #text = "Rnver eçmrmr jıpqıvnçpı feleü öırhnvnrn lnvvızznüqıçı feypeü Vskaö lecepeü jıünhı öepmü çıünrn vıünr deqer deqer he mpmö jbdıp lecepeü epmü Zefnezze gerpmpmö feypeü Fbzbr gerpmpeü çırn fnü leçeze feypeqermr ledmüpm­km İğnrhıhnü Zefnez ömypmö fıçed ıpfnvıpıünrn ğmöeümü çıünrı çıynp ıpfnvıpıü jn­çıü Rnver eçmrhe çekqaü ğsö çekeü Fare lepö eüevmrhe Rnver Çekqaüpe­üm hırnü Fa eçhe çekqaü vmö vmö çekeü eqe ömve vbüıü Rnver eçm fbzbr gerpmpeüe çeyeqe vıcnrgn cıünü nrverm leçeze fekpeü Vefel ıüöırhır öepömt tırgıüıçn eğmt öaypeümr yeüömpeümrm hnrpıqıö nrverm qazpa ıhıü Lıü çerhe feleü ösöava cı feleü zıqndpnkn ceühmü Fbçbö yılnüpıühı rnverm ieüö ızqıö dsühaü Yılnü nrverm gervmd cı çbövıö fızsr fnrepeüher feyöe fnü yıç jşüqıd"
        text = ciphertext
        letter_distribution = calculate_letter_distribution(text)
        plain_letter_distribution = calculate_letter_distribution(plain_percentage_text)

        # Sort the letters based on their percentages
        sorted_distribution = sorted(letter_distribution.items(), key=lambda x: x[1], reverse=True)
        plain_sorted_distribution = sorted(plain_letter_distribution.items(), key=lambda x: x[1], reverse=True)

        text = text.lower()


        #attempt = text.replace("a", "\033[31me\033[0m")


        # In[52]:


        #First Attempts.....A E İ N R
        text_length = len(text)
        letter_frequency_keys = list(turkish_frequencies.keys())

        count = 0
        for i in range(5):
            if sorted_distribution[i][0] == " ":
                print("Space character...")
            else:
                print("word character...",sorted_distribution[i][0], letter_frequency_keys[count])
                attempt = text.replace(sorted_distribution[i][0], letter_frequency_keys[count])
                text = attempt
                count += 1
                print(text)


        # "\033[31m" + letter_frequency_keys[count] + "\033[0m")
        #attempt = text.replace("a", "\033[31me\033[0m")
        #attempt = text.replace("a", "\033[31me\033[0m")
        #attempt = text.replace("a", "\033[31me\033[0m")



        #for i in range(text_length):
         #   print(text[i][0])


        # In[53]:


        ######Split words and check 2 letter words...
        splitted_text = text.split(" ")
        a_count = 0
        e_count = 0
        for two_letter_word in splitted_text:
            if len(two_letter_word) == 2:
                print(f"Found a word with exactly two letters: {two_letter_word[1]}")
                if two_letter_word[1] == "A":
                    a_count += 1
                elif two_letter_word[1] == "E":
                    e_count += 1

        #change a and e order....
        if (a_count - e_count) > 2:
            print("yes")
            attempt = text.replace("A", "X")
            text = attempt
            attempt = text.replace("E", "A")
            text = attempt
            attempt = text.replace("X", "E")
            text = attempt

        print(text)


        # In[54]:


        ###### Check 3 letter words........
        splitted_text = text.split(" ")
        for three_letter_word in splitted_text:
            if len(three_letter_word) == 3:
                print(f"Found a word with exactly three letters: {three_letter_word}")
                if three_letter_word[0] == "A" and three_letter_word[2] == "A":
                    print("found AMA...")
                    attempt = text.replace(three_letter_word[1], "M")
                    text = attempt
                #elif two_letter_word[1] == "E":
        print(text)


        # In[55]:


        ##### we know "AN" now we can find "AR"
        from collections import Counter
        twoLetter_list = []
        text_length = len(text)
        for i in range(text_length):
            if text[i] == "A" and text[i + 1] != " " and (i + 1) != text_length and text[i + 1].isupper() == False:
                twoLetter_list.append(text[i] + text[i + 1])

        counter = Counter(twoLetter_list)
        sorted_data = sorted(counter.items(), key=lambda x: (x[1], x[0]), reverse=True)

        if sorted_data[0][1] - sorted_data[1][1] >= 2:
            attempt = text.replace(sorted_data[0][0][1], "R")
            text = attempt

        print(text)


        # In[56]:


        ### Check 3 words last three words for -len -den and check 2 letter words for "de" && -lar -ler
        text_length = len(text)
        three_letter_den_control = []
        two_letter_de_control = []
        l_count = []
        for i in range(text_length):
            isUpper = text[i][0].isupper()
            if isUpper == False and text[i + 1][0] == "E" and text[i + 2][0] == "N":
                three_letter_den_control.append(text[i][0] + text[i + 1][0] + text[i + 2][0])
            if (i + 2) < text_length:
                if isUpper == False and text[i + 1][0] == "A" and text[i + 2][0] == "R":
                    l_count.append(text[i][0])
                if isUpper == False and text[i + 1][0] == "E"  and text[i + 2][0] == "R":
                    l_count.append(text[i][0])
        print(l_count)
        counter = Counter(l_count)
        sorted_l_count = sorted(counter.items(), key=lambda x: x[1], reverse=True)

        print(sorted_l_count)
        if (sorted_l_count[0][1] - sorted_l_count[1][1]) > 2:
            attempt = text.replace(sorted_l_count[0][0], "L")
            text = attempt

        for two_letter_word in splitted_text:
            if len(two_letter_word) == 2:
                if (two_letter_word[1]) == "E":
                    two_letter_de_control.append(two_letter_word)

        print(three_letter_den_control)
        print(two_letter_de_control)
        for three in three_letter_den_control:
            for two in two_letter_de_control:
                if two[0] == three[0] and two[1] == three[1]:
                    #de found......
                    print("match found...")
                    attempt = text.replace(two[0], "D")
                    text = attempt
        print(text)



        # In[62]:


        #####check common word list and match....
        splitted_text = text.split(" ")
        lower_word = ""
        match_count = 0
        for i in common_word_list:
            match_count = 0
            if len(i) == 2:
                ######## VE, BU
                for two_letter_word in splitted_text:
                    if len(two_letter_word) == 2:
                        if any(char.islower() for char in two_letter_word) and any(letter.isupper() for letter in two_letter_word):
                            isLower_twoLetter = 1
                            #print(two_letter_word[0], two_letter_word[1])
                            if two_letter_word[1] == 'E':
                                #Find and change "VE"
                                attempt = text.replace(two_letter_word[0], 'V')
                                text = attempt
                            if two_letter_word[0] == 'B':
                                print(two_letter_word)
                                attempt = text.replace(two_letter_word[1], 'U')
                                text = attempt
            elif len(i) == 3:
                for three_letter_word in splitted_text:
                    isLower = 0
                    if len(three_letter_word) == 3:
                        if any(char.islower() for char in three_letter_word):
                            isLower = 1
                        count = 0
                        if i[0] == three_letter_word[0]:
                            count += 1
                        if i[1] == three_letter_word[1]:
                            count += 1
                        if i[2] == three_letter_word[2]:
                            count += 1

                        if count >= 2 and isLower == 1:
                            match_count += 1
                            for j in range (3):
                                if (three_letter_word[j].islower() == True):
                                    lower_word = three_letter_word[j]
                                    index = j
            elif len(i) == 4:
                for four_letter_word in splitted_text:
                    isLower_fourLetter = 0
                    if len(four_letter_word) == 4:
                        if any(char.islower() for char in four_letter_word):
                            isLower_fourLetter = 1
                        count_fourLetter = 0
                        if i[0] == four_letter_word[0]:
                            count_fourLetter += 1
                        else:
                            wrong_fourLetter_word = four_letter_word[0]
                            correct_fourLetter_word = i[0]
                        if i[1] == four_letter_word[1]:
                            count_fourLetter += 1
                        else:
                            wrong_fourLetter_word = four_letter_word[1]
                            correct_fourLetter_word = i[1]
                        if i[2] == four_letter_word[2]:
                            count_fourLetter += 1
                        else:
                            wrong_fourLetter_word = four_letter_word[2]
                            correct_fourLetter_word = i[2]
                        if i[3] == four_letter_word[3]:
                            count_fourLetter += 1
                        else:
                            wrong_fourLetter_word = four_letter_word[3]
                            correct_fourLetter_word = i[3]
                        if count_fourLetter >= 3 and isLower_fourLetter == 1:
                            #match_count += 1
                            print("abc",i, four_letter_word,"....", wrong_fourLetter_word, correct_fourLetter_word)
                            attempt = text.replace(wrong_fourLetter_word, correct_fourLetter_word)
                            text = attempt
            elif len(i) == 5:
                for five_letter_word in splitted_text:
                    isLower_fiveLetter = 0
                    if len(five_letter_word) == 5:
                        if any(char.islower() for char in five_letter_word):
                            isLower_fiveLetter = 1
                        count_fiveLetter = 0
                        if i[0] == five_letter_word[0]:
                            count_fiveLetter += 1
                        else:
                            wrong_fiveLetter_word = five_letter_word[0]
                            correct_fiveLetter_word = i[0]
                        if i[1] == five_letter_word[1]:
                            count_fiveLetter += 1
                        else:
                            wrong_fiveLetter_word = five_letter_word[1]
                            correct_fiveLetter_word = i[1]
                        if i[2] == five_letter_word[2]:
                            count_fiveLetter += 1
                        else:
                            wrong_fiveLetter_word = four_letter_word[2]
                            correct_fiveLetter_word = i[2]
                        if i[3] == five_letter_word[3]:
                            count_fiveLetter += 1
                        else:
                            wrong_fiveLetter_word = five_letter_word[3]
                            correct_fiveLetter_word = i[3]
                        if i[4] == five_letter_word[4]:
                            count_fiveLetter += 1
                        else:
                            wrong_fiveLetter_word = five_letter_word[4]
                            correct_fiveLetter_word = i[4]
                        if count_fiveLetter >= 4 and isLower_fiveLetter == 1:
                            #match_count += 1
                            print("abc",i, five_letter_word,"....", wrong_fiveLetter_word, correct_fiveLetter_word)
                            attempt = text.replace(wrong_fiveLetter_word, correct_fiveLetter_word)
                            text = attempt



            #print(match_count, i[index], "llll",lower_word, index)
            if match_count > 2:
                #print(i[index], lower_word)
                attempt = text.replace(lower_word, i[index])
                text = attempt

        print(text)


        # In[60]:


        #### find "diği" for "Ğ" and find "DIR" for "I"
        splitted_text = text.split(" ")
        for word in splitted_text:
            if len(word) > 4:
                length = len(word)
                if word[length - 1] == "İ" and word[length - 3] == "İ" and word[length - 4] == "D" and word[length - 2].islower():
                    attempt = text.replace(word[length - 2], "Ğ")
                    text = attempt
            if len(word) > 3:
                if word[len(word) - 1] == "R" and word[len(word) - 3] == "D" and word[len(word) - 2].islower():
                    word_count_list.append(word[length - 2])
                    print("qqq",word, word[length - 2])
        counter = Counter(word_count_list)
        sorted_lst_I = sorted(counter.items(), key=lambda x: x[1], reverse=True)
        attempt = text.replace(sorted_lst_I[0][0], "I")
        text = attempt
        print(text)

        return text






