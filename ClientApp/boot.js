import "./css/site.css";
import "bootstrap";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import * as RoutesModule from "./routes";
let routes = RoutesModule.routes;

import { createStore, combineReducers } from 'redux'; //Se referencia el store, donde se almacena el state de la app
import { Provider } from 'react-redux'; //Hacer visible el store a nuestros componentes
import tokenReducer from './reducers/tokenReducer';
import postReducer from './reducers/postReducer';

const reducer = combineReducers({
  tokenReducer,
  postReducer
});

const store = createStore(reducer);

function renderApp() {
  // This code starts up the React app when it runs in a browser. It sets up the routing
  // configuration and injects the app into a DOM element.
  const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <BrowserRouter children={routes} basename={baseUrl} />
      </AppContainer>
    </Provider>,
    document.getElementById("react-app")
  );
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
  module.hot.accept("./routes", () => {
    routes = require("./routes").routes;
    renderApp();
  });
}
