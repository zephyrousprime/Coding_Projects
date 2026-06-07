import random

# RPS Game
print("Welcome to Rock Paper Scissors!")
print("----------------------------------")
print("Instructions:")
print("Enter 'R' for Rock, 'P' for Paper, or 'S' for Scissors.")
print("Best of 3 rounds wins the match!\n")

play = True

while play:
    count = 3
    player_score = 0
    comp_score = 0
    round_number = 1

    while count > 0:
        print(f"\nRound {round_number} of 3")
        
        comp_choice = random.choice(['R', 'P', 'S'])
        player_choice = input("Enter your choice (R/P/S): ").upper().strip()

        # Validate input
        while player_choice not in ('R', 'P', 'S'):
            print("Invalid choice. Please enter R, P, or S.")
            player_choice = input("Enter your choice (R/P/S): ").upper().strip()

        # Handle ties
        while player_choice == comp_choice:
            print(f"It's a tie! You both chose {comp_choice}. Please choose again.")
            player_choice = input("Enter your choice (R/P/S): ").upper().strip()
            while player_choice not in ('R', 'P', 'S'):
                print("Invalid choice. Please enter R, P, or S.")
                player_choice = input("Enter your choice (R/P/S): ").upper().strip()
            comp_choice = random.choice(['R', 'P', 'S'])

        # Main game logic
        if comp_choice == 'R':
            if player_choice == 'P':
                print("Player Wins! Paper wraps Rock.")
                player_score += 1
            else:
                print("Computer Wins! Rock breaks Scissors.")
                comp_score += 1

        elif comp_choice == 'P':
            if player_choice == 'S':
                print("Player Wins! Scissors cut Paper.")
                player_score += 1
            else:
                print("Computer Wins! Paper wraps Rock.")
                comp_score += 1

        elif comp_choice == 'S':
            if player_choice == 'R':
                print("Player Wins! Rock breaks Scissors.")
                player_score += 1
            else:
                print("Computer Wins! Scissors cut Paper.")
                comp_score += 1

        count -= 1
        round_number += 1
        print(f"Current Score → Player: {player_score} | Computer: {comp_score}")

    # End of match summary
    print("\n----------------------------------")
    print("Final Scores:")
    print(f"Player: {player_score} | Computer: {comp_score}")

    if player_score > comp_score:
        print("Congratulations! You won the match!")
    elif comp_score > player_score:
        print("Computer wins this time. Better luck next round!")
    else:
        print("It's an overall tie!")

    # Replay option
    play_again = input("\nWould you like to play again? (y/n): ").lower().strip()
    if play_again != 'y':
        play = False
        print("\nThanks for playing Rock Paper Scissors! Goodbye!")
