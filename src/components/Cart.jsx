import { useContext } from "react";

import { CartContext } from "../store/CartContext";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div className="cart">
      {items.length === 0 && <p>No items in cart!</p>}

      {items.length > 0 && (
        <ul>
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id} className="cart-item">
                <div>
                  <span>{item.name}</span>
                  <span>
                    {formattedPrice} x {item.quantity}
                  </span>
                </div>

                <div className="cart-item-actions">
                  <button onClick={() => removeItem(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addItem(item)}>+</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="cart-total">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
