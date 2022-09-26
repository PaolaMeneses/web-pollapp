import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";

import { store } from "./store/index.jsx";
import router from "./router.jsx";
// import "./index.css";

const colors = {
  brand: {
    // 100: "#fff",
    // 200: "#fff",
    // 300: "#fff",
    // 400: "#fff",
    500: "#850f32",
    600: "#48001c",
    700: "#2e0012",
    // 800: "#fff",
    // 900: "#fff",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
