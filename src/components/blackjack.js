import React, { useState, useEffect } from 'react'; 
import '../../src/blackjack.css'; 

function Blackjack() {
  const [cards, setCards] = useState([]);
  const [totalValue, setTotalValue] = useState(0);  
  const [dealerCards, setDealerCards] = useState([]); 
  const [dealerTotalValue, setDealerTotalValue] = useState(0); 
   const [gameOver, setGameOver] = useState(true); 
   const [deckId, setDeckId] = useState(null); // Deck ID from API 
   const [gameStarted, setGameStarted] = useState(false); // Flag to indicate if game has started 
  const deckUrl = 'https://www.deckofcardsapi.com/api/deck/new/shuffle/'; 
  
  useEffect(() => { 
    // Effect to start the game when gameStarted state changes 
    if (gameStarted) {  startGame();
     } [gameStarted] })} 

    const startGame = async () => {
    const response = await fetch(deckUrl);
    const deckData = await response.json(); 
    setDeckId(deckData.deck_id);
    // Draw initial cards for dealer and player 
  const playerDraw = await drawCards(deckData.deck_id, 2); 
  const dealerDraw = await drawCards(deckData.deck_id, 2); 
  
// Set cards and calculate initial total values 
setDealerCards(dealerDraw.cards); 
setDealerTotalValue(calculateTotalValue(dealerDraw.cards));
setCards(playerDraw.cards); 
setTotalValue(calculateTotalValue(playerDraw.cards)); 
// Update game flags 
setGameStarted(true); 
setGameOver(false); }; 

const drawCards = async (deckId, count) => { 
  // Function to draw cards from the deck 
  const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`); 
  const data = await response.json(); 
  return data; }; 
  
  const hit = async () => { 
    // Hit Me button function
  if (gameOver) return; 
  // Draw a card
  const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`); 
  const newCard = await response.json(); 
  const newerCard = newCard.cards[0]; 
  const updatedCards = [...cards, newerCard]; 
const newTotal = calculateTotalValue(updatedCards);
 // Update player's cards and total value 
setCards(updatedCards);setTotalValue(newTotal); 
// Check if player busts 
if (newTotal > 21) { setGameOver(true); 
alert("Bust! You lose."); }
else { // Delay dealers turn
 await new Promise((resolve) => setTimeout(resolve, 500)); 
dealerTurn(); } }; 
const stand = async () => { 
  // stand function
if (gameOver) return; 
await new Promise((resolve) => setTimeout(resolve, 500)); dealerTurn(); };


const dealerTurn = async () => { 
  // dealer's turn 
  if (dealerTotalValue < 17 && !gameOver) {
     // Dealer draws cards until total value is 17 or higher 
const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`); 
const newCardData = await response.json(); 
const newCard = newCardData.cards[0]; 
const updatedDealerCards = [...dealerCards, newCard];
const newDealerTotal = calculateTotalValue(updatedDealerCards); 
// Update dealer's cards and total value 
setDealerCards(updatedDealerCards); 
setDealerTotalValue(newDealerTotal); // Check if dealer busts 
if (newDealerTotal > 21) { 
  setGameOver(true); alert("Dealer Busts! You win."); 
  return; } } // Determine the winner after dealer's turn 

  if(!gameOver) { 

    determineWinner(); 

  } }; const determineWinner = () => { 
    // Function to determine the winner and end the game 
     if(totalValue === dealerTotalValue) { 
      alert("It's a tie!"); 
    } else if (totalValue === 21) {
      alert("You have blackjack!"); 
    } else if (totalValue > dealerTotalValue || dealerTotalValue > 21) { 
    alert("You win!"); 
  } else if (totalValue < dealerTotalValue || totalValue > 21) { 
    alert("Dealer wins."); 
  } else if (dealerTotalValue === 21 ) {
    alert("Dealer has blackjack")
  }
    
  setGameOver(true); }; 

  const calculateTotalValue = (cards) => { 
    // Function to calculate total value of cards 
  let total = cards.reduce((acc, card) => { 
  const value = card.value; 
  return acc + (value === 'ACE' ? 11 : isNaN(value) ? 10 : parseInt(value)); }, 0); 
  cards.forEach(card => { 
  if (card.value === 'ACE' && total > 21) { 
    total -= 10; } }); 
  return total; }; 
    const restartGame = () => { 
      // Function to restart the game 
      setCards([]);setTotalValue(0); 
      setDealerCards([]); 
      setDealerTotalValue(0); 
      setGameOver(false); 
      setGameStarted(false); 
      startGame(); };
      const renderCards = (cardList) => { 
        // Function to render cards 
        return cardList.map((card, index) => (
         <div className="card" key={index}> 
        <img width='150px' src={card.image} alt={`Card ${index}`} />
        </div> )); }; 

        return (
        <div className='Game'> 
        <h3>Welcome to Blackjack!</h3> 
        <img className='blackjackImg' src='https://m.media-amazon.com/images/I/51T7FKS4YTL._SR600%2C315_PIWhiteStrip%2CBottomLeft%2C0%2C35_SCLZZZZZZZ_FMpng_BG255%2C255%2C255.jpg' alt="Blackjack" /> 
        <div className='buttons'>
         <button onClick={startGame} disabled={gameStarted}> Start Game</button>
         <button onClick={hit} disabled={!gameStarted || gameOver}> Hit Me </button> 
        <button onClick={stand}disabled={!gameStarted || gameOver}> Stand </button> 
        <button onClick={restartGame} disabled={!gameStarted}>Restart Game </button> 
        </div> 
        <div className="handDiv"> <h4>Your Hand: {totalValue} </h4> 
        <div className='hands'> {renderCards(cards)} </div> 
        <h4>Dealer's Hand: {dealerTotalValue}</h4> 
        <div className='hands'> {renderCards(dealerCards)} </div> 
        </div> 
        </div> ); } 
        export default Blackjack;