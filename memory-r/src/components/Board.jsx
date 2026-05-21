import '../CSS/board.css'
import Card from './Card.jsx';

function Board({ deck, onFlip, difficulty = 'easy' }) {
  return (
    <div className={`board ${difficulty}`}>
      {deck.map((card) => (
        <Card 
          key={card.id} 
          card={card} 
          onFlip={() => onFlip(card)} 
        />
      ))}
    </div>
  );
}

export default Board;
