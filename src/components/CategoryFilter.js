import React, { useState, useEffect } from 'react';


function CategoryFilter({ products, onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
   
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [products]);
 
  return (
    <div>
      <h2 style={{fontFamily:'Helvetica-Oblique'}}>Categories</h2>
      <select onChange={(e) => onSelectCategory(e.target.value)}
      style={{backgroundColor:'linen'}}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
