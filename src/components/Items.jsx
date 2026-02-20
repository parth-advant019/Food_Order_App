import { useContext } from "react";
import { CartContext } from "../store/CartContext";

export default function Items({ items, loadingText, isLoading }) {
  const { addItem } = useContext(CartContext);

  return (
    <ul id="meals">
      {items.map((item) => (
        <li key={item.id} className="meal-item">
          <article>
            <img src={`http://localhost:3000/${item.image}`} alt="img" />
            <h3>{item.name}</h3>
            <div className="meal-item-price">
              <p>{item.price}</p>
            </div>
            <p className="meal-item-description">{item.description}</p>
            <div className="meal-item-actions">
              <button
                className="button"
                onClick={() => addItem({ ...item, price: Number(item.price) })}
              >
                add to cart
              </button>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
