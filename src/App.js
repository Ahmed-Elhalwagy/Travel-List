import { useState } from "react";

const intialItems = [
  { description: "Phone", quantity: 1, packed: true, id: 1 },
  { description: "laptop", quantity: 1, packed: true, id: 2 },
  { description: "charger", quantity: 2, packed: false, id: 3 },
];

function App() {
  const [items, setItems] = useState(intialItems);

  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} items={items} />
      <PackingList items={items} setItems={setItems} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ items, setItems }) {
  function handelSubmit(e) {
    e.preventDefault();
    const quantity = Number(e.target[0].value);
    const description = e.target[1].value;

    if (!description) return;

    setItems([
      ...items,
      {
        description,
        quantity,
        packed: false,
        id: Date.now(),
      },
    ]);
    // console.log(items);
  }

  return (
    <>
      <form className="add-form" onSubmit={handelSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={3}>4</option>
          <option value={3}>5</option>
        </select>
        <input type="text" placeholder="Item..." />
        <button>Add</button>
      </form>
    </>
  );
}

function PackingList({ items, setItems }) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                setItems={setItems}
                items={items}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

function Item({ item, setItems, items }) {
  const [packed, setPacked] = useState(item.packed);

  function deleteHandler(e) {
    setItems(items.filter((i) => i.id !== item.id));
  }

  function clickHandler(e) {
    e.preventDefault();
    if (e.detail == 2) {
      item.packed = !item.packed;
      setItems(items.map((i) => (i.id == item.id ? item : i)));
    }
  }

  return (
    <li>
      <span>{item.quantity}</span>
      <button
        className={`${item.packed ? "item-packed" : ""}`}
        onClick={clickHandler}
        data-value={item.description}
      >
        {item.description}
      </button>
      <button onClick={deleteHandler}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  let num0fItems = items.reduce((acc, item) => acc + item.quantity, 0);
  let packedItems = items.reduce((acc, item) => {
    return item.packed ? (acc += item.quantity) : acc;
  }, 0);
  let percentage = num0fItems > 0 ? (packedItems / num0fItems) * 100 : 0;
  return (
    <>
      <footer className="stats">
        You have {num0fItems} items on your list, and you already packed{" "}
        {packedItems} ({percentage})%
      </footer>
    </>
  );
}

export default App;
