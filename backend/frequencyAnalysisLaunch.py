import frequencyAnalysis


def main():

    """
    Demonstration of the frequencyanalysis module.
    """

    print("----------------------")
    print("| codedrome.com      |")
    print("| Frequency Analysis |")
    print("----------------------\n")

    try:
        frequencyAnalysis.create_decryption_dictionary("inceMemed.txt",
                                                       "encrypted.txt",
                                                       "decryption_dict.json")
    except Exception as e:
        print(e)

    try:
        frequencyAnalysis.decrypt_file("encrypted.txt",
                                       "decrypted.txt",
                                       "decryption_dict.json")
    except Exception as e:
        print(e)


main()