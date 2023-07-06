import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Statistics from "./components/Statistics";

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

  function clearListHandler(e) {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to clear all the list?"
    );
    if (confirmed) setItems([]);
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
        clearListHandler={clearListHandler}
      />
      <Statistics items={items} />
    </div>
  );
}

export default App;
