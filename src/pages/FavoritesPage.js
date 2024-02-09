// FavoritesPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { removeFromFavorites } from '../redux/favorites/favoritesActions';
import CustomButton from '../components/ButtonComponent'; // Import the CustomButton component

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ borderBottom: '2px solid saddleBrown', paddingBottom: '10px' }}>
        Favorites
      </h1>
      {favorites.length === 0 ? (
        <p className="text-center">Your favorites list is empty.</p>
      ) : (
        <div>
          {favorites.map(item => (
            <Card key={item.id} className="mb-3">
              <Card.Img src={item.images[0]} alt={item.title} className="cart-item-image" style={{ width: '10%' }} />
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Card.Text>Category: {item.category}</Card.Text>
                </div>
                <div className="d-flex align-items-center">
                  <CustomButton
                    label="Remove from Favorites"
                    backgroundColor="firebrick"
                    borderColor="firebrick"
                    width="auto"
                    onClick={() => handleRemoveFromFavorites(item.id)}
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
