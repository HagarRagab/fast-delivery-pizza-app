import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getCartPrice, getCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getCartQuantity);
  const totalCartPrice = useSelector(getCartPrice);

  if (!totalCartQuantity) return;

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 sm:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
