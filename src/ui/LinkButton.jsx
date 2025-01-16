import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className =
    "text-blue-400 transition-all duration-300 hover:text-blue-500 hover:underline";

  if (to === "-1")
    return (
      <button onClick={() => navigate(-1)} className={className}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
