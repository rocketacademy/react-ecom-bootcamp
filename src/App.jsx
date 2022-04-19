import React, { useState } from "react";
import axios from "axios";

import Cart from "./components/Cart.jsx";
import Items from "./components/Items.jsx";
import ItemDetail from "./components/ItemDetail.jsx";

const ItemForm = ({ getItems }) => {
  const [name, setName] = useState("ss");
  const [description, setDescription] = useState("desc");
  const [price, setPrice] = useState("desc");

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      ></input>
      <input
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      ></input>
      <input
        type="text"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      ></input>
      <input
        type="submit"
        onClick={() => {
          axios
            .post("/item", { name, description, price })
            .then(getItems);
        }}
      ></input>
    </>
  );
};

export default function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState();

  const addToCart = (item, quantity) => {
    const cartItem = { quantity, ...item };
    setCart([cartItem, ...cart]);
  };

  const setItemDetail = (itemIndex) => {
    setSelectedItemIndex(itemIndex);
  };

  const getItems = () => {
    axios.get("/items").then((result) => {
      console.log(result);
      setItems(() => result.data.items);
    });
  };

  const selectedItem = items[selectedItemIndex];

  return (
    <div className="container">
      <div className="row">
        <h1 className="page-title">Wow Shopping!</h1>
        <Items items={items} setItemDetail={setItemDetail} />
        {items.length === 0 && (
          <button type="button" onClick={getItems}>
            Get Items
          </button>
        )}
        <ItemDetail item={selectedItem} addToCart={addToCart} />
        <Cart items={cart} />
        <ItemForm getItems={getItems} />
      </div>
    </div>
  );
}
