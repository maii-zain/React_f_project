import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavScrollExample from './components/Nav';
import RegisterForm from './components/Auth/RegistrationForm';
import LoginForm from './components/Auth/LoginForm';
import ProductList from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import SearchedProducts from './components/Nav';
import { CartProvider } from './contexts/CartContext';
import CartPage from './components/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchResults from './pages/SearchResults.';
import Logout from './components/Auth/LogOut';
import NotFound404 from './pages/Notfound';


function App() {
  return (
    <Router>
      <div className="App">
        <NavScrollExample />
        <Switch>
          <CartProvider>
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/home" component={ProductList} />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/favorites" component={FavoritesPage} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/search-results" component={SearchResults} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={RegisterForm} />
            <Route exact path="/sign" component={RegisterForm} />
            <Route exact path="/logout" component={Logout} />
            {/* <Route exact path={"*"} component={NotFound404} /> */}

            
          </CartProvider>
          
        </Switch>
      </div>
    </Router>
  );
}
export default App;