import React from 'react';
import Card from 'react-bootstrap/Card';
import { useCart } from '../contexts/CartContext';
import CustomButton from './ButtonComponent'; 


const CartPage = () => {
  const { state, removeFromCart } = useCart();
  const { cartItems } = state;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ borderBottom: '2px solid saddleBrown', paddingBottom: '10px' }}>
        Shopping Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <Card key={item.id} className="mb-3" style={{ backgroundColor: 'beige', border: '2px solid saddleBrown' }}>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title style={{ color: 'saddleBrown' }}>{item.title}</Card.Title>
                  <Card.Text>Price: ${item.price}</Card.Text>
                </div>
                <div className="d-flex align-items-center">
                  <Card.Img src={item.images[0]} alt={item.title} className="cart-item-image" />
                  <CustomButton
                    label="Remove"
                    backgroundColor="firebrick"
                    borderColor="firebrick"
                    width="auto"
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
          <div className="d-flex justify-content-end">
            <p className="me-3">Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
            <CustomButton
              label="Proceed to Checkout"
              backgroundColor="rosybrown"
              borderColor="rosybrown"
              // onClick={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
