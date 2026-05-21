function Button({ onClick, label, type = 'button', disabled = false, className = '' }) {
    return (
        <button
            type={type}
            className={['custom-button', className].filter(Boolean).join(' ')}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}
export default Button;