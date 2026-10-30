validletters = "plante"
stopW = "stop"
index = 0
def Number_P():
    arrP = [
        "#### ",
        "#   #",
        "#### ",
        "#    ",
        "#    "
    ]
    return arrP
def Number_L():
    arrL = [
        "#    ",
        "#    ",
        "#    ",
        "#    ",
        "#####",
    ]
    return arrL
def Number_A():
    arrA = [
        " ### ",
        "#   #",
        "#####",
        "#   #",
        "#   #"
    ]
    return arrA
def Number_N():
    arrN = [
        "#   #",
        "##  #",
        "# # #",
        "#  ##",
        "#   #",
    ]
    return arrN
def Number_T():
    arrT = [
        "#####",
        "  #  ",
        "  #  ",
        "  #  ",
        "  #  "
    ]
    return arrT
def Number_E():
    arrE = [
        "#####",
        "#    ",
        "#####",
        "#    ",
        "#####"
    ]
    return arrE
def display_word(word):
    letter_patterns = {
        "p": Number_P(),
        "l": Number_L(),
        "a": Number_A(),
        "n": Number_N(),
        "t": Number_T(),
        "e": Number_E()
    }
    for row in range(5):
        line = ""

        for letter in word:
            line += letter_patterns[letter][row] + " "

        print(line)
def SToP():
    print("stopping...")
    #add more to this
def checkval(worsd):
    if worsd == stopW:
        SToP()
        return False
    if not isinstance(worsd, str):
        print("Please enter a word")
        return False
    if worsd != worsd.lower():
        print("Please enter the word correctly")
        return False
    for letter in worsd:
        if letter not in validletters:
            print("Please enter a word with the letters p, l, a, n, t, e")
            return False
    return True
def find(words, letters):
    index2 = 0
    while index2 < len(words):
        if words[index2] == letters:
            return index2
        index2 += 1
    return -1
word = input("what word would you like to show?")
if checkval(word):
    display_word(word)

        