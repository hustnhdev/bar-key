const gameContainer = document.getElementById('game-container');

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to generate a mini card element with a background image based on the result
function createMiniCard(result) {
    const miniCard = document.createElement('div');
    miniCard.className = 'mini-card';
    miniCard.setAttribute('data-card-result', result);

    // Initially set background image to 0.png (back of the card)
    miniCard.style.backgroundImage = `url('src/img/0.png')`;

    // Add click event listener to reveal the card result
    miniCard.addEventListener('click', handleCardReveal);

    return miniCard;
}

// Function to handle card reveal
function handleCardReveal(event) {
    const miniCard = event.currentTarget;
    const result = parseInt(miniCard.getAttribute('data-card-result'));

    // Set background image to the revealed card result
    miniCard.style.backgroundImage = `url('src/img/${result}.png')`;

    // Update the result sum in the player's container
    const playerContainer = miniCard.closest('.player-container');
    const resultLine = playerContainer.querySelector('.result-line');
    let currentSum = parseInt(resultLine.textContent.split(':')[1].trim());
    const current = result % 9 === 0 ? 9 : result % 9;
    currentSum += current;

    currentSum = currentSum % 10 === 0 ? 10 : currentSum % 10

    // Display the updated result sum
    resultLine.textContent = `Tổng điểm: ${currentSum}`;
    miniCard.removeEventListener('click', handleCardReveal);
}

// Create an array of 36 cards
const allCards = Array.from({ length: 36 }, (_, index) => index + 1);

// Shuffle the array to randomize the card order
shuffleArray(allCards);
const selectedCards = allCards.slice(0, 24);
// Create players and append them to card slots
const cardSlots = document.querySelectorAll('.card-slot');

for (let i = 1; i <= cardSlots.length; i++) {
    const playerContainer = document.createElement('div');
    playerContainer.className = 'player-container';

    // Player name
    const playerName = document.createElement('div');
    playerName.className = 'player-name';
    playerName.textContent = `Player ${i}`;

    // Three mini cards
    const miniCardContainer = document.createElement('div');
    miniCardContainer.className = 'mini-card-container';

    for (let j = 0; j < 3; j++) {
        const card = selectedCards.pop(); // Take the last card from the shuffled array
        const miniCard = createMiniCard(card);
        miniCardContainer.appendChild(miniCard);
    }

    // Result line
    const resultLine = document.createElement('div');
    resultLine.className = 'result-line';
    resultLine.textContent = 'Tổng điểm: 0'; // Initial sum is 0

    // Append player components to the card slot
    playerContainer.appendChild(playerName);
    playerContainer.appendChild(miniCardContainer);
    playerContainer.appendChild(resultLine);

    // Clear existing content of the card slot and append player container
    cardSlots[i - 1].innerHTML = '';
    cardSlots[i - 1].appendChild(playerContainer);
}

function handleCardClick(event) {
    const slotId = event.currentTarget.getAttribute('data-slot-id');
}

function openUserPopup() {
    var popupContainer = document.getElementById('popup-container');
    popupContainer.style.display = 'block';
}

function closeUserPopup() {
    var popupContainer = document.getElementById('popup-container');
    popupContainer.style.display = 'none';
}