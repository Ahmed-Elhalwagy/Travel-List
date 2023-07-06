function Item({ item, onDeleteItem, onDoubleClickItem }) {
  return (
    <li>
      <span>{item.quantity}</span>
      <button
        onClick={(e) => onDoubleClickItem(e, item.id)}
        data-value={item.description}
        className={`${item.packed ? "item-packed" : ""}`}
      >
        {item.description}
      </button>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

export default Item;
