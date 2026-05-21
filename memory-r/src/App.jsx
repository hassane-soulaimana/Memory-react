import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Board from './components/Board.jsx';

const cardTemplates = [
  { pairId: 'rocket', emoji: '🚀' },
  { pairId: 'owl', emoji: '🦉' },
  { pairId: 'plane', emoji: '✈️' },
  { pairId: 'sun', emoji: '☀️' },
  { pairId: 'moon', emoji: '🌙' },
  { pairId: 'star', emoji: '⭐' },
  { pairId: 'leaf', emoji: '🍀' },
  { pairId: 'fire', emoji: '🔥' },
];

const levelSizes = {
  easy: 4,
  medium: 6,
  hard: 8,
};

function createDeck(pairCount = 8) {
  const selectedTemplates = cardTemplates.slice(0, pairCount);
  const pairs = selectedTemplates.flatMap((template) => [
    { ...template, id: null, flipped: false, matched: false },
    { ...template, id: null, flipped: false, matched: false },
  ]);

  for (let i = pairs.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  return pairs.map((card, index) => ({ ...card, id: index }));
}

export default function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [deck, setDeck] = useState(() => createDeck(levelSizes.easy));
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }

  function startGame(nextDifficulty) {
    const level = levelSizes[nextDifficulty] ? nextDifficulty : 'easy';
    setDifficulty(level);
    setDeck(createDeck(levelSizes[level]));
    setMoves(0);
    resetTurn();
  }

  function handleFlip(card) {
    if (disabled || card.flipped || card.matched) return;

    setDeck((prev) =>
      prev.map((currentCard) =>
        currentCard.id === card.id ? { ...currentCard, flipped: true } : currentCard
      )
    );

    if (!choiceOne) {
      setChoiceOne(card);
      return;
    }

    setMoves((currentMoves) => currentMoves + 1);

    if (choiceOne.pairId === card.pairId) {
      setDeck((prev) =>
        prev.map((currentCard) =>
          currentCard.pairId === card.pairId
            ? { ...currentCard, matched: true }
            : currentCard
        )
      );
      resetTurn();
      return;
    }

    setChoiceTwo(card);
    setDisabled(true);
  }

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    const timer = setTimeout(() => {
      setDeck((prev) =>
        prev.map((currentCard) =>
          currentCard.id === choiceOne.id || currentCard.id === choiceTwo.id
            ? { ...currentCard, flipped: false }
            : currentCard
        )
      );
      resetTurn();
    }, 1000);

    return () => clearTimeout(timer);
  }, [choiceOne, choiceTwo]);

  function handleReset() {
    startGame(difficulty);
  }

  return (
    <div>
      <Header
        moves={moves}
        difficulty={difficulty}
        onReset={handleReset}
        onDifficultyChange={startGame}
      />
      <Board deck={deck} onFlip={handleFlip} difficulty={difficulty} />
    </div>
  );
}