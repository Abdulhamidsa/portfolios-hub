import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./components/layout/Layout.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </>
);
