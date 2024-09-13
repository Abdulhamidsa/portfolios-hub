// import { StrictMode } from "react";

import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout";

createRoot(document.getElementById("root")!).render(
  <>
    <Layout>
      <App />
    </Layout>
  </>
);
