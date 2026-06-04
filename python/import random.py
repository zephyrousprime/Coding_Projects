import random

# Game configuration
MAX_WRONG = 6  
FRUITS = ['banana', 'cherry', 'papaya', 'orange', 'grapes', 'tomato', 'orange', 'squash', ]  

#choose a random word from the list
def pick_word(word_list):
    return random.choice(word_list)

#display current progress of guessed letters
def display_progress(secret, guessed_letters):
    return ' '.join(ch if ch in guessed_letters else '_' for ch in secret)

#display hangman state based on wrong guesses
def display_hangman(wrong_count):
    stages = [
        # 0 wrong
        """
        
        
        
        
        """,
        # 1 wrong
        """
        
        
        
        
        |_____
        """,
        # 2 wrong
        """
          _______
          |     
          |     
          |     
          |     
        """,
        # 3 wrong
        """
          _______
          |     |
          |     O
          |     
          |     
        """,
        # 4 wrong
        """
          _______
          |     |
          |     O
          |     |
          |     
        """,
        # 5 wrong
        """
          _______
          |     |
          |     O
          |    /|\\
          |     
        """,
        # 6 wrong (final)
        """
          _______
          |     |
          |     O
          |    /|\\
          |    / \\
        """
    ]
    # Ensure wrong_count is within bounds
    idx = min(max(0, wrong_count), len(stages) - 1)
    print(stages[idx])

# Play a single round of hangman
def play_round():
    secret = pick_word(FRUITS)
    guessed_letters = set()
    wrong_letters = set()
    wrong_count = 0

    # Game loop
    while True:
        # Show current state
        print("\n" + "-" * 40)
        print(f"Chances left: {MAX_WRONG - wrong_count}")
        print("Guessed wrong letters:", ', '.join(sorted(wrong_letters)) if wrong_letters else "none")
        print("Word: ", display_progress(secret, guessed_letters))
        display_hangman(wrong_count)

        # Check win condition
        if all(ch in guessed_letters for ch in secret):
            print(f"\nCongratulations! You guessed the word: {secret}")
            return

        # Check lose condition
        if wrong_count >= MAX_WRONG:
            print(f"\nGame over. The word was: {secret}")
            return

        # Get player input
        guess = input("Enter a letter to guess: ").strip().lower()

        # Validate input
        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter (a-z).")
            continue

        # Already guessed?
        if guess in guessed_letters or guess in wrong_letters:
            print(f"You already guessed '{guess}'. Try a different letter.")
            continue

        # Apply guess
        if guess in secret:
            guessed_letters.add(guess)
            print(f"Good guess: '{guess}'")
        else:
            wrong_letters.add(guess)
            wrong_count += 1
            print(f"Wrong guess: '{guess}'")

# Main entry: play rounds until the user chooses to stop.
def main():
    print("Welcome to the Fruit Hangman Game!")
    while True:
        know = input("Do you know how to play hangman? (yes/no): ").strip().lower()
        if know in ('yes', 'no'):
            break
        print("Please answer 'yes' or 'no'.")

    if know == 'yes':
        print("Goal: guess the fruit one letter at a time.")
        print(f"You have {MAX_WRONG} wrong attempts before losing.\n")
    elif know == 'no':
        print("Have a good day.")
        return
    # Play rounds
    while True:
        play_round()
        again = input("\nPlay again? (y/n): ").strip().lower()
        if again not in ('y', 'yes'):
            print("Thanks for playing. Goodbye!")
            break
        
# Run the main function
if __name__ == '__main__':
    main()