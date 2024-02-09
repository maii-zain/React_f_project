import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();
// Func handles different actions of shopping cart, 
const cartReducer = (state, action) => {
  switch (action.type) {
    //check for action equal what ?
    case 'ADD_TO_CART':
      //it updates the cartItems with a new array that includes all the previous items in state cartItems.
      //  adds the new item specified in action.payload.
      //في البدايه هي متعرفع ب اراي فاضيه 
      return { ...state, cartItems: [...state.cartItems, action.payload] };

    case 'REMOVE_FROM_CART':
      //vew ARR = item with the specified productId from the existing state.cartItems
      //  بعملهم فلتريشن لحد ما يبيقي الاي دي  بتاع العناصر اللي في الكارت منش من ضمنهم الاي دي اللي في الباي لود
      const updatedCart = state.cartItems.filter(item => item.id !== action.payload.productId);
      return { ...state, cartItems: updatedCart };
    // لو اي حاجت تاني هيرجع الكارت بعناصرها الموجوده 
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  //definition:state management hook particularly useful when dealing with more complex state logic in your components
// i use it here because the states deoends on eachother (as useState hook ) احيانا
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    const productToRemove = state.cartItems.find(item => item.id === productId);
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, price: productToRemove.price } });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, removeFromCart }}>
    {children}
  </CartContext.Provider>
);
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
