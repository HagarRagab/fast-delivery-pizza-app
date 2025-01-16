import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";

function ItemQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default ItemQuantity;
