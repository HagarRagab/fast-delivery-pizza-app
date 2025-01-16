import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import ItemQuantity from "./ItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between text-sm font-medium sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <ItemQuantity pizzaId={pizzaId} quantity={quantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
