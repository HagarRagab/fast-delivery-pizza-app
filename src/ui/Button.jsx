import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "rounded-full bg-yellow-400 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-500 focus:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    secondary:
      "rounded-full text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-stone-300 border-2 border-stone-300 focus:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300 px-4 py-2.5 md:px-6 md:py-3.5",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
  };

  if (to !== undefined)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
