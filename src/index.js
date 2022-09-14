import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./app/store";

import { userApiSlice } from "./features/users/userSlice";

// store.dispatch(userApiSlice.endpoints.getAllUsers.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
