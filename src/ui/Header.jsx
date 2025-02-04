import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between gap-1 border-b border-stone-300 bg-yellow-400 px-4 py-3 uppercase tracking-widest sm:px-6">
      <Link to="/">Fast Delivery Pizza co.</Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
