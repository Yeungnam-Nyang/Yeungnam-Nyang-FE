import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Router } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
<<<<<<< HEAD
<App />
  </StrictMode>,
)
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
>>>>>>> a0ed1278214d01e9e203a5be736da1ef734374e2
