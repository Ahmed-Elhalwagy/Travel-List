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

export default Statistics;
