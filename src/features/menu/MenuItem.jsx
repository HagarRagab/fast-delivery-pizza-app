import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import ItemQuantity from "../cart/ItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  const dispatch = useDispatch();

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex items-center gap-2 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-16 sm:h-20 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-1 flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4">
          {!soldOut ? (
            <>
              <p className="flex-1 text-sm">{formatCurrency(unitPrice)}</p>
              {isInCart ? (
                <>
                  <ItemQuantity pizzaId={id} quantity={currentQuantity} />
                  <DeleteItem pizzaId={id} />
                </>
              ) : (
                <Button type="small" onClick={handleAddToCart}>
                  add to cart
                </Button>
              )}
            </>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
