import React, { useState } from 'react';
import {
  AiFillPlusSquare,
  AiFillCheckCircle,
  AiFillRightCircle,
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillDelete,
} from 'react-icons/ai';
import './style.less';

export default function App() {
  const [items, setItems] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [totalItems, setTotalItems] = useState(6);

  const handleButtonAdd = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };
    if (newItem.itemName !== '') {
      const newItems = [...items, newItem];
      setItems(newItems);
    } else {
      alert('There is nothing to add');
    }

    setInputValue('');
    calculateTotal();
  };

  const handleButtonIncrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity++;

    setItems(newItems);
    calculateTotal();
  };

  const handleButtonDecrease = (index) => {
    const newItems = [...items];

    newItems[index].quantity--;

    if (newItems[index].quantity === 0) {
      const itemDelete = newItems.indexOf(newItems[index]);
      newItems.splice(itemDelete, 1);
    }

    setItems(newItems);
    calculateTotal();
  };

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].isSelected = !newItems[index].isSelected;

    setItems(newItems);
  };

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItems(totalItemCount);
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <div className="app">
      <div className="app-container">
        <div className="app-item__box">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Add an item..."
            className="app-item__input"
          />
          <AiFillPlusSquare onClick={handleButtonAdd} />
        </div>
        <div className="app-item__list">
          {items.map((item, index) => (
            <div className="app-item__list-container">
              <div
                className="app-item__list-name"
                onClick={() => toggleComplete(index)}
              >
                {item.isSelected ? (
                  <>
                    <AiFillCheckCircle />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <AiFillRightCircle />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <AiOutlineMinus onClick={() => handleButtonDecrease(index)} />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <AiOutlinePlus onClick={() => handleButtonIncrease(index)} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {items.length !== 0 ? (
          <footer>
            <div className="delete" onClick={clearAll}>
              <AiFillDelete />
              Delete All
            </div>
            <div className="total">Total: {totalItems}</div>
          </footer>
        ) : (
          <footer className="empty">
            <h4>Empty bag</h4>
          </footer>
        )}
      </div>
    </div>
  );
}
