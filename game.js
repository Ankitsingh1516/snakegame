let rollingSound = new Audio('rpg-dice-rolling-95182.mp3');
let winSound = new Audio('winharpsichord-39642.mp3');

// Red player's position
let p1sum = 0;

// Global flag to track if a question is active
let questionActive = false;

// Function to handle ladders
function handleLadder(player, destination) {
    // alert(`Ladder! Climbing up to position ${destination}.`);
    p1sum = destination; // Update the player's position
    updatePlayerPosition(player, p1sum, 0); // Update player visually
}

// Function to update the player's position visually
function updatePlayerPosition(player, position, correction) {
    document.getElementById(player).style.transition = `linear all .5s`;

    if (position < 10) {
        // For positions 1-9
        document.getElementById(player).style.left = `${(position - 1) * 62}px`;
        document.getElementById(player).style.top = `${-0 * 62 - correction}px`;
    } else if (position === 100) {
        // Winning condition
        winSound.play();
        alert(`${player} Won!!`);
        location.reload();
    } else {
        // For positions 10-99
        let numarr = Array.from(String(position));
        let n1 = parseInt(numarr.shift());
        let n2 = parseInt(numarr.pop());

        if (n1 % 2 !== 0) {
            // Odd rows (reverse direction)
            if (n2 === 0) {
                document.getElementById(player).style.left = `${9 * 62}px`;
                document.getElementById(player).style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                document.getElementById(player).style.left = `${(9 - (n2 - 1)) * 62}px`;
                document.getElementById(player).style.top = `${-n1 * 62 - correction}px`;
            }
        } else {
            // Even rows (normal direction)
            if (n2 === 0) {
                document.getElementById(player).style.left = `0px`;
                document.getElementById(player).style.top = `${(-n1 + 1) * 62 - correction}px`;
            } else {
                document.getElementById(player).style.left = `${(n2 - 1) * 62}px`;
                document.getElementById(player).style.top = `${-n1 * 62 - correction}px`;
            }
        }
    }
}

// Function to play the game and update positions
function play(player, correction, num) {
    p1sum += num;
    if (p1sum > 100) {
        p1sum -= num; // Prevent overshooting 100
    }

    // Snakes and ladders logic
    switch (p1sum) {
        case 6:
            handleLadder(player, 24);
            return;
        case 11:
            handleLadder(player, 28);
            return;
        case 19:
            p1sum = 3; // Snake down
            break;
        case 23:
            p1sum = 5; // Snake down
            break;
        case 26:
            handleLadder(player, 36);
            return;
        case 39:
            handleLadder(player, 41);
            return;
        case 48:
            p1sum = 30; // Snake down
            break;
        case 50:
            handleLadder(player, 68);
            return;
        case 61:
            p1sum = 59; // Snake down
            break;
        case 62:
            handleLadder(player, 84);
            return;
        case 69:
            p1sum = 47; // Snake down
            break;
        case 73:
            handleLadder(player, 92);
            return;
        case 75:
            handleLadder(player, 95);
            return;
        case 85:
            p1sum = 65; // Snake down
            break;
        case 94:
            p1sum = 74; // Snake down
            break;
        case 99:
            p1sum = 77; // Snake down
            break;
    }

    updatePlayerPosition(player, p1sum, correction);
}

// Event listener for dice roll
document.getElementById("diceBtn").addEventListener("click", function () {
    if (questionActive) {
        alert("Please answer the current question before rolling again.");
        return;
    }

    rollingSound.play(); // Play dice rolling sound
    let num = Math.floor(Math.random() * 6) + 1; // Roll the dice (1-6)
    document.getElementById("dice").innerText = num;

    // Add dice face classes for visual representation (optional)
    let diceElement = document.getElementById("dice");
    diceElement.classList.remove('one', 'two', 'three', 'four', 'five', 'six');
    diceElement.classList.add(num.toString());

    // Update the player's position after rolling the dice
    play('p1', 0, num);
});
