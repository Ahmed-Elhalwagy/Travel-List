import { useState } from "react";

const intialItems = [
  { description: "Phone", quantity: 1, packed: true, id: 1 },
  { description: "laptop", quantity: 1, packed: true, id: 2 },
  { description: "charger", quantity: 2, packed: false, id: 3 },
];

function App() {
  const [items, setItems] = useState(intialItems);

  function handelAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function deleteHandler(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handelDoubleClick(e, id) {
    if (e.detail === 2) {
      setItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, packed: !item.packed } : item
        )
      );
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} handelAddItems={handelAddItems} />
      <PackingList
        items={items}
        setItems={setItems}
        onDeleteItem={deleteHandler}
        onDoubleClickItem={handelDoubleClick}
      />
      <Statistics items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ handelAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handelSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    handelAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <>
      <form className="add-form" onSubmit={handelSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={3}>4</option>
          <option value={3}>5</option>
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  );
}

function PackingList({ items, onDeleteItem, onDoubleClickItem }) {
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
        </div>
      </div>
    </>
  );
}

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

function Statistics({ items }) {
  let num0fItems = items.reduce((acc, item) => acc + item.quantity, 0);
  let packedItems = items.reduce((acc, item) => {
    return item.packed ? (acc += item.quantity) : acc;
  }, 0);
  let percentage =
    num0fItems > 0 ? Math.round((packedItems / num0fItems) * 100) : 0;
  return (
    <>
      <footer className="stats">
        {percentage === 100
          ? "You Got Everything to go ✈️"
          : num0fItems === 0
          ? "Start Adding some items to your packing list"
          : `You have ${num0fItems} items on your list, and you already packed ${packedItems} (${percentage})%`}
      </footer>
    </>
  );
}

export default App;
