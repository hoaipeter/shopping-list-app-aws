import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './App.css';

import { AddShoppingItem, ShoppingList, ShoppingItem } from './components/';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Smartpay Demo
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/shopping-list'} className="nav-link">
              Shopping List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/add'} className="nav-link">
              Add Item
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={['/', '/shopping-list']} component={ShoppingList} />
          <Route exact path="/add" component={AddShoppingItem} />
          <Route path="/shopping-list/:id" component={ShoppingItem} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
