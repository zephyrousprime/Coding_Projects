# Garden Plot Label Generator
# Five-row block letters for plot names made from p, l, a, n, t and e

validletters = "plante"
stopW = "STOP"

def Number_P(row):
    #Return row 0-4 of the P letter pattern as one five-character line.
    arrP = [
        "#### ",
        "#   #",
        "#### ",
        "#    ",
        "#    "
    ]
    return arrP[row]
def Number_L(row):
    #Return row 0-4 of the L letter pattern as one five-character line.
    arrL = [
        "#    ",
        "#    ",
        "#    ",
        "#    ",
        "#####",
    ]
    return arrL[row]
def Number_A(row):
    #Return row 0-4 of the A letter pattern as one five-character line.
    arrA = [
        " ### ",
        "#   #",
        "#####",
        "#   #",
        "#   #"
    ]
    return arrA[row]
def Number_N(row):
    #Return row 0-4 of the N letter pattern as one five-character line.
    arrN = [
        "#   #",
        "##  #",
        "# # #",
        "#  ##",
        "#   #",
    ]
    return arrN[row]
def Number_T(row):
    #Return row 0-4 of the T letter pattern as one five-character line.
    arrT = [
        "#####",
        "  #  ",
        "  #  ",
        "  #  ",
        "  #  "
    ]
    return arrT[row]
def Number_E(row):
    #Return row 0-4 of the E letter pattern as one five-character line.
    arrE = [
        "#####",
        "#    ",
        "#####",
        "#    ",
        "#####"
    ]
    return arrE[row]
def display_word(word):
    #Print a plot name as a five-row block-letter label with no gaps.
    letter_patterns = {
        "p": Number_P,
        "l": Number_L,
        "a": Number_A,
        "n": Number_N,
        "t": Number_T,
        "e": Number_E
    }
    for row in range(5):
        line = ""
        for letter in word:
            line += letter_patterns[letter](row)
        print(line)
def SToP():
    #Print the closing message when the user enters the break word.
    print("stopping...")
    print("Goodbye, happy gardening!")


def checkval(worsd):
    """Return True only when a plot name may be displayed.
    A plot name must be a non-empty lowercase word made only of
    the letters p, l, a, n, t and e."""
    if not isinstance(worsd, str):
        print("Please enter a word")
        return False
    if len(worsd) == 0:
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
    # Loop until the user enters the break word
while True:
    word = input("What word would you like to show? ")
    if word.upper() == stopW:
        SToP()
        break
    if checkval(word):
        display_word(word)
