import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from './store/store';

import AdminApp from "./AdminApp";

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <BrowserRouter>
			<Provider store={store} >
				<AdminApp />
			</Provider>
		</BrowserRouter>
  </React.StrictMode>

)
