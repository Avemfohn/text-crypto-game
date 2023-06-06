import random
import codecs
import locale
import re
import pandas as pd
import openpyxl

locale.setlocale(locale.LC_ALL, "tr_TR.utf8")

# This is the function that will be used to encrypt
def new_letter(letter):
    alphabet_lower = "abcçdefgğhıijklmnoöprsştuüvyz"
    alphabet_upper = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ"

    if letter in alphabet_lower:
        return alphabet_lower[(len(alphabet_lower)-1) - alphabet_lower.index(letter)]
    elif letter in alphabet_upper:
        return alphabet_upper[(len(alphabet_upper)-1) - alphabet_upper.index(letter)]
    else:
        return letter


def frequency_analysis(text):
    alphabet_lower = "abcçdefgğhıijklmnoöprsştuüvyz"
    lower_map = {
        ord(u'I'): u'ı',
        ord(u'İ'): u'i',
        ord(u'Ü'): u'ü',
        ord(u'Ö'): u'ö',
        ord(u'Ç'): u'ç',
        ord(u'Ş'): u'ş',
        ord(u'Ğ'): u'ğ',
    }
    text = text.translate(lower_map)
    text = text.lower()
    word_count={}
    for letter in alphabet_lower:
        if letter in {"a","b","c","ç","d","e","f","g","ğ","h","ı","i","j","k","l","m","n","o","ö","p","r","s","ş","t","u","ü","v","y","z"}:
            word_count[letter] = text.count(letter)
    word_percentage = {k: round((v / sum(word_count.values() )* 100),2) for k, v in word_count.items()}
    # print(word_percentage)
    # print(word_count)
    return word_percentage


def atbash_cipher(raw_text):
    return "".join([new_letter(letter) for letter in raw_text])


file1 = codecs.open('wiki.tr.txt', "r", "utf8")
Lines = file1.readlines()

f = codecs.open("outputs/output.txt", "w", "utf-8")
f.write("plain_text"+ ","+"cipher_text"+","+"cipher_type")
for letter in "abcçdefgğhıijklmnoöprsştuüvyz":
    f.write("," + letter)
f.write("\n")

for line in Lines:
    f.write(line.strip() + ",")
    f.write(atbash_cipher(line.strip()))
    f.write(","+"atbash")
    frq = frequency_analysis(atbash_cipher(line.strip()))
    for frq in frq.values():
        f.write("," + str(frq))
    f.write("\n")
f.close()
read_file = pd.read_csv (r'outputs/output.txt')
read_file.to_csv(r'outputs/outputCSVAtbash.csv', index=None, header=True)
df = pd.read_csv('outputs/output.txt', sep=',')
df.to_excel('outputs/outputEXAtbash.xlsx', index=False)