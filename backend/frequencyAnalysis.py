from operator import itemgetter
import json


def create_decryption_dictionary(plaintext_filepath, encrypted_filepath, dictionary_filepath):

    """
    Create an estimated mapping between encrypted letters and
    plaintext letters by comparing the frequencies in the
    plaintext and encrypted text.
    The dictionary is then saved as a JSON file.
    """

    sample_plaintext_alphabet = "abcçdefgğhıijklmoöprsştuüvyz"
    encrypted_alphabet = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ"

    sample_plaintext = _readfile(plaintext_filepath)
    encrypted_text = _readfile(encrypted_filepath)

    sample_plaintext_frequencies = _count_letter_frequencies(sample_plaintext, sample_plaintext_alphabet)
    encrypted_text_frequencies = _count_letter_frequencies(encrypted_text, encrypted_alphabet)

    decryption_dict = {}
    for i in range(0, min(len(encrypted_text_frequencies), len(sample_plaintext_frequencies))):
        decryption_dict[encrypted_text_frequencies[i][0]] = sample_plaintext_frequencies[i][0].lower()

    with open(dictionary_filepath, "w") as f:
        json.dump(decryption_dict, f)


def decrypt_file(encrypted_filepath, decrypted_filepath, dictionary_filepath):

    """
    Use the dictionary to decrypt the encrypted file
    and save the result.
    """

    encrypted_text = _readfile(encrypted_filepath)

    with open(dictionary_filepath, "r") as f:
        decryption_dict = json.load(f)

    decrypted_list = []

    for letter in encrypted_text:
        asciicode = ord(letter)
        if (asciicode >= 65 and asciicode <= 90) or (asciicode >= 192 and asciicode <= 221):
            decrypted_list.append(decryption_dict.get(letter.upper(), ""))

    decrypted_text = "".join(decrypted_list)

    with open(decrypted_filepath, "w") as f:
        f.write(decrypted_text)


def _count_letter_frequencies(text, alphabet):

    """
    Create a dictionary of letters and count the frequency
    of each in the supplied text.
    The returned data structure is a list as we need to sort it by frequency.
    """

    frequencies = {}

    for letter in alphabet:
        frequencies[letter] = 0

    for letter in text:
        if letter in alphabet:
            frequencies[letter] += 1

    sorted_by_frequency = sorted(frequencies.items(), key=itemgetter(1), reverse=True)

    return sorted_by_frequency


def _readfile(path):

    with open(path, "r") as f:
        text = f.read()
    return text
