export default function Items() {
  return (
    <ul id="meals">
      <li className="meal-item">
        <article>
          <img />
          <h3>title</h3>
          <div className="meal-item-price">
            <p>price</p>
          </div>
          <p className="meal-item-description">dec</p>
          <div className="meal-item-actions">
            <button>add to cart</button>
          </div>
        </article>
      </li>
    </ul>
  );
}
