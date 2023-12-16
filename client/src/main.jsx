// ./src/main.jsx

import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Router from "./Router"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
    <div className="bg-[url('/img/hero-pattern.svg')]"></div>
  </React.StrictMode>
)
