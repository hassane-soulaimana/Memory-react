function Card({ card, onFlip }) {
  const isVisible = card.flipped || card.matched;

  return (
    <div
      className={`card ${isVisible ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`.trim()}
      onClick={onFlip}
    >
      <div className="card-inner">
        {/* Face cachée */}
        <div className="card-front">
          <div className="card-back-pattern" />
        </div>

        {/* Face révélée */}
        <div className="card-back">
          {card.image
            ? <img src={card.image} alt="" className="card-img" />
            : <span className="card-emoji">{card.emoji}</span>
          }
        </div>
      </div>
    </div>
  );
}

export default Card;