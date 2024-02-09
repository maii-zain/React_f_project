// SearchPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CustomButton from '../components/ButtonComponent';

const SearchPage = ({ location, history }) => {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    //  اقدر اني استخدم هنا ال use loction() hook   عشان امسك السيرش كويري
    const queryParam = new URLSearchParams(location.search).get('q');
    setSearchQuery(queryParam || '');

    /*checking if the response is an array, and updating the results state. Logging an error if the response is invalid.*/ 
    if (queryParam) {
      axios.get(`https://dummyjson.com/products?q=${queryParam}`)
        .then(response => {
          const data = response.data;
          if (Array.isArray(data.products)) {
            setResults(data.products);
          } else {
            console.error('Invalid API response:', data);
          }
        })
        .catch(error => console.error('Error fetching search results:', error));
    }
  }, [location.search]);

  const handleProductClick = (productId) => {
    history.push(`/product/${productId}`);
  };

  //تشيك علي اللور كيس في السيرش كويري 
  const filteredResults = results.filter(result =>
    result.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <br/><br/>
      <center><h2 style={{color:'#8B4513'}}>Search Results</h2></center> 
      <p>Search word: {searchQuery}</p>
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredResults.map(result => (
          <Col key={result.id}>
            <Card
              style={{ width: '22rem', margin: '10px', background: 'beige', cursor: 'pointer' }}
              onClick={() => handleProductClick(result.id)}
            >
              <Card.Img variant="top" src={result.images[0]} alt={result.title} style={{ height: '180px' }} />
              <hr style={{ backgroundColor: 'peru' }}></hr>
              <Card.Body>
                <Card.Title style={{ color: 'saddleBrown' }}>{result.title}</Card.Title>
                <Card.Text>
                  {result.description.length > 40
                    ? `${result.description.slice(0, 50)}...`
                    : result.description}
                </Card.Text>
                <Card.Text style={{ fontStyle: 'italic', color: 'saddleBrown' }}>
                  Price: ${result.price}
                </Card.Text>
                <CustomButton
                  label="View Details"
                  backgroundColor="saddleBrown"
                  borderColor="saddleBrown"
                  width="auto"
                  onClick={() => handleProductClick(result.id)}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SearchPage;
