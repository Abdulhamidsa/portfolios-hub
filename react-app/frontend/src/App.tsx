import "./App.css";
import Loading from "./components/Loading";
import { routes } from "./routes/routes";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
