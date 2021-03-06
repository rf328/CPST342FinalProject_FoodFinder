import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import './index.css';
import App from './App';
import Header from './header.js'
import SearchResults from './SearchResults.js';
import Infocard from './InfoCard.js';
import Recipecard from './RecipeCard.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
