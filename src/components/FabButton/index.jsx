import "./fab-button.style.css";

export function FabButton({ ariaLabel, onClick, children }) {
  return (
    <button aria-label={ariaLabel} onClick={onClick} className="fab">
      {children}
    </button>
  );
}
