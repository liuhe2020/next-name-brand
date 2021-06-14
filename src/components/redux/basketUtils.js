export const handleAddToBasket = ({ prevItems, nextItem }) => {
  // check if item to be added already exists
  if (prevItems.find((item) => item.id === nextItem.id)) {
    // map through the items and update the quantity to the one already exists
    return prevItems.map((item) =>
      item.id === nextItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...prevItems, { ...nextItem, quantity: 1 }];
};

export const handleReduceBasket = ({ prevItems, toRemoveItem }) => {
  // locate item with matching id
  const existingItem = prevItems.find((item) => item.id === toRemoveItem.id);
  // if item's quantity = 1, remove it
  if (existingItem.quantity === 1) {
    return prevItems.filter((item) => item.id !== toRemoveItem.id);
  }
  // otherwise reduce quantity by 1
  return prevItems.map((item) =>
    item.id === toRemoveItem.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
