import Button from './Button.jsx';

function Header({ moves, difficulty, onReset, onDifficultyChange }) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        flexWrap: 'wrap',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Memory Game</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span>
          Coups : <strong>{moves}</strong>
        </span>

        <Button label="Rejouer" onClick={onReset} />

        <Button
          label="Facile"
          onClick={() => onDifficultyChange('easy')}
          className={difficulty === 'easy' ? 'difficulty-btn active' : 'difficulty-btn'}
        />
        <Button
          label="Moyen"
          onClick={() => onDifficultyChange('medium')}
          className={difficulty === 'medium' ? 'difficulty-btn active' : 'difficulty-btn'}
        />
        <Button
          label="Difficile"
          onClick={() => onDifficultyChange('hard')}
          className={difficulty === 'hard' ? 'difficulty-btn active' : 'difficulty-btn'}
        />
      </div>
    </header>
  );
}

export default Header;