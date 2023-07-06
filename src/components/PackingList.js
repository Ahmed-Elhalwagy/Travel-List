import { useState } from "react";
import Item from "./Item";

function PackingList({
  items,
  onDeleteItem,
  onDoubleClickItem,
  clearListHandler,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  switch (sortBy) {
    case "input":
      sortedItems = items;
      break;
    case "description":
      sortedItems = [...items].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
      break;
    case "packed":
      sortedItems = items
        .slice()
        .sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
    default:
      sortedItems = items;
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                onDeleteItem={onDeleteItem}
                onDoubleClickItem={onDoubleClickItem}
              />
            );
          })}
        </ul>
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">sort By input order</option>
            <option value="description">sort By description</option>
            <option value="packed">sort By status</option>
          </select>
          <button onClick={(e) => clearListHandler(e)}>Clear List</button>
        </div>
      </div>
    </>
  );
}

export default PackingList;
