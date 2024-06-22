import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";

import { generateColors } from "@mantine/colors-generator";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';


const theme = createTheme({
  fontFamily: '"Inter", sans-serif',
  colors: { green: generateColors("#48b02c") },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
