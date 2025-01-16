import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";
import { clearCart, getCart, getCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const errors = useActionData();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isSubmitting = navigation.state === "submitting";
  const {
    username,
    address,
    position,
    status: addressStatus,
    error: addressError,
  } = useSelector((state) => state.user);
  const isAddressLoading = addressStatus === "loading";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-5">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="mb-2 sm:basis-40">First Name</label>
          <input
            className="input flex-1"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="mb-2 sm:basis-40">Phone number</label>
          <div className="flex-1">
            <input className="input w-full" type="tel" name="phone" required />
            {errors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-4 flex flex-col sm:flex-row sm:items-center">
          <label className="mb-2 sm:basis-40">Address</label>
          <div className="flex-1">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              defaultValue={address}
            />
            {addressError && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isAddressLoading}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="text-sm font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmitting || isAddressLoading}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  // collect form inputs + cart items
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };

  // error handling
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Invalid phone number. Please add correct phone number we might need to contact you";
  if (Object.keys(errors).length > 0) return errors;

  // send data to server
  const newOrder = await createOrder(order);

  // Clear cart after placing order
  store.dispatch(clearCart());

  // Display order page after posting the order
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
