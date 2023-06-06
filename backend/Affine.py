import random
import codecs
import locale
import re
import pandas as pd
import openpyxl

locale.setlocale(locale.LC_ALL, "tr_TR.utf8")

# This is the function that will be used to encrypt
def new_letter(letter, a,b):
    alphabet_lower = "abcçdefgğhıijklmnoöprsştuüvyz"
    alphabet_upper = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ"

    if letter in alphabet_lower:
        return alphabet_lower[(alphabet_lower.index(letter) * a + b) % len(alphabet_lower)]
    elif letter in alphabet_upper:
        return alphabet_upper[(alphabet_upper.index(letter) * a + b) % len(alphabet_upper)]
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


def affine_cipher(raw_text, a,b):
    return "".join([new_letter(letter, a,b) for letter in raw_text])


file1 = codecs.open('wiki.tr.txt', "r", "utf8")
Lines = file1.readlines()

f = codecs.open("outputs/output.txt", "w", "utf-8")
f.write("plain_text"+ ","+"cipher_text"+ ","+" (a)" + ","+" (b)")
for letter in "abcçdefgğhıijklmnoöprsştuüvyz":
    f.write("," + letter)
f.write("\n")

for line in Lines:
    random_a = random.randint(1, 28)
    random_b = random.randint(1, 29)
    f.write(line.strip() + ",")
    f.write(affine_cipher(line.strip(), random_a, random_b))
    f.write(","+ str(random_a) + ","+ str(random_b))
    frq = frequency_analysis(affine_cipher(line.strip(), random_a, random_b))
    for frq in frq.values():
        f.write("," + str(frq))
    f.write("\n")

f.close()
read_file = pd.read_csv (r'outputs/output.txt')
read_file.to_csv(r'outputs/outputCSVAffine.csv', index=None, header=True)
df = pd.read_csv('outputs/output.txt', sep=',')
df.to_excel('outputs/outputEXAffine.xlsx', index=False)