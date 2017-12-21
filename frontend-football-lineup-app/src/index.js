import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import countryReducer from './reducers/countryReducer';
import competitionReducer from './reducers/competitionReducer';
import eventReducer from './reducers/eventReducer';
import searchReducer from './reducers/searchReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'semantic-us-css/semantic.min.css';

const rootReducer = combineReducers({ search: searchReducer, country: countryReducer, competition: competitionReducer, event: eventReducer })
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
