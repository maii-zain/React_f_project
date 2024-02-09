import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products`)
      .then(response => {
        const productById = response.data.products.find(p => p.id === parseInt(id));
        setProduct(productById);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-3" style={{backgroundColor:'beige'}}> 
      <Row>
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Img variant="top" src={product.images[0]} alt={product.title} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Row>
                <Col>
                  <Card.Text>Description: {product.description}</Card.Text>
                  <Card.Text>Price: ${product.price}</Card.Text>
                </Col>
                <Col>
                  <Card.Text>Discount: {product.discountPercentage}%</Card.Text>
                  <Card.Text>Rating: {product.rating}</Card.Text>
                  <Card.Text>Stock: {product.stock}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
