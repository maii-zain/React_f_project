import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomButton from '../components/ButtonComponent';
import Pagination from '../components/Pagination';
import { useCart } from '../contexts/CartContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../redux/favorites/favoritesActions';
import CategoryFilter from '../components/CategoryFilter';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  //product that is currently expanded or open. It is initialized with null
  const [expandedProduct, setExpandedProduct] = useState(null);
  const { dispatch } = useCart();//my custom hook
  const history = useHistory();
  const dispatch2 = useDispatch();
  //It is used to extract data from the Redux store's state.
  //extracts the favorites property from the Redux state.
  const favorites = useSelector(state => state.favorites);
  //ال all categories = = null
  const [selectedCategory, setSelectedCategory] = useState(null);
// بهاندل ايفنت عشان يضيف البردكت للفيفورت 
  const handleAddToFavorites = (product) => {
    dispatch2(addToFavorites(product));
    // history.push('/favorites');
  };

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => console.error(error));
  }, []);


/*1-Calculates the index of the last product to be displayed on the current page
2-using ternary operator to check there is a catg or no
3-وبتحسب النتيجه بناء علي الحسابات اللي فوق دي */ 

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory).slice(indexOfFirstProduct, indexOfLastProduct)
    : products.slice(indexOfFirstProduct, indexOfLastProduct);
//function that takes a pageNumber parameter and updates the current page (setCurrentPage) to the specified page number. 
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const toggleDescription = productId => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const handleProductClick = productId => {
    history.push(`/product/${productId}`);
  };

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
// بتشيك لو الاي دي بتاع اي المنت في الفيفورت = الاي اللي جاي 
  const isProductInFavorites = (productId) => {
    return favorites.some(item => item.id === productId);
  };


  return (
    
    <div style={{ border: '0px solid peru', padding: '3%', backgroundColor: 'beige', marginRight: '2%', marginLeft: '2%', paddingRight: '-9%' }}>
       <CategoryFilter products={products} onSelectCategory={category => setSelectedCategory(category)} />

      <h1 className='heads' style={{ borderBlockColor: 'saddleBrown' }}>Best Selling</h1>
      <br /><br /> <br /><br />
      <div className="card-container">
        <Row xs={1} md={2} lg={4} className="g-4">
          {currentProducts.map(product => (
            <Col key={product.id}>
              <Card
                style={{ width: '22rem', margin: '10px', background: 'beige', cursor: 'pointer' }}
                onClick={() => handleProductClick(product.id)}
              >
                <Card.Img variant="top" src={product.images[0]} alt={product.title} style={{ height: '180px' }} />
                <hr style={{ backgroundColor: 'peru' }}></hr>
                <Card.Body>
                  <Card.Title style={{ color: 'saddleBrown' }}>{product.title}</Card.Title>
                  <Card.Text>
                    {expandedProduct === product.id
                      ? product.description
                      : `${product.description.slice(0, 50)}...`}
                  </Card.Text>
                  {product.description.length > 40 && (
                    <CustomButton
                      label={expandedProduct === product.id ? 'Read Less' : 'Read More'}
                      backgroundColor="saddleBrown"
                      borderColor="saddleBrown"
                      width="auto"
                      onClick={() => toggleDescription(product.id)}
                    />
                  )}
                  <Card.Text style={{ fontStyle: 'italic', color: 'saddleBrown' }}>
                    Price: ${product.price}
                  </Card.Text>
                  <Row>
                    <Col>
                    <CustomButton
                      label="Add to Cart"
                      backgroundColor="saddleBrown"
                      borderColor="saddleBrown"
                      onClick={() => handleAddToCart(product)}
                    />
                    </Col>
                    <Col>
                      <center>
                        <CustomButton
                          label="Buy Now"
                          backgroundColor="peru"
                          borderColor="peru"
                          // onClick={() => {}}
                        />
                      </center>
                    </Col>
                    <Col>
                      <CustomButton
                        label="Add to Favorites"
                        backgroundColor={isProductInFavorites(product.id) ? 'darksalmon' : 'saddleBrown'}
                        borderColor={isProductInFavorites(product.id) ? 'darksalmon' : 'saddleBrown'}
                        width="100%"
                        onClick={() => handleAddToFavorites(product)}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={products.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default ProductList;
