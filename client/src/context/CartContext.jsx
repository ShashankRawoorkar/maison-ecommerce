import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext(null);

const initialState = {
  items: [],
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + (action.payload.qty || 1),
        };
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: action.payload.qty || 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((_, idx) => idx !== action.payload),
      };
    }
    case 'UPDATE_QTY': {
      const updated = [...state.items];
      updated[action.payload.index] = {
        ...updated[action.payload.index],
        qty: Math.max(1, action.payload.qty),
      };
      return { ...state, items: updated };
    }
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    case 'OPEN_CART': {
      return { ...state, isOpen: true };
    }
    case 'CLOSE_CART': {
      return { ...state, isOpen: false };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product, selectedSize, selectedColor, qty = 1) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, selectedSize, selectedColor, qty },
    });
  };

  const removeItem = (index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
  };

  const updateQty = (index, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { index, qty } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.qty, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
