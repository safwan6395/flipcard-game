import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

import "./App.css";

const cardImages = [
  { src: "./img/helmet-1.png", match: false },
  { src: "./img/potion-1.png", match: false },
  { src: "./img/ring-1.png", match: false },
  { src: "./img/scroll-1.png", match: false },
  { src: "./img/shield-1.png", match: false },
  { src: "./img/sword-1.png", match: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // shuffling the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(0);
  };

  // taking choices
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare cards
  useEffect(() => {
    // MY PATCH
    if (choiceOne?.id === choiceTwo?.id) return;

    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(reset, 1000);
      }
      setTurn((prevState) => prevState + 1);
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increase turns
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  // starting the game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.match}
              disabled={disabled}
              key={card.id}
            />
          );
        })}
      </div>
      <p>turns: {turns}</p>
    </div>
  );
}

export default App;
