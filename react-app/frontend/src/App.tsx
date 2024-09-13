import "./App.css";
import MultiStepLoginFormComponent from "./components/MultiStepLoginFormComponent";
import { Suspense } from "react";

function App() {
  return (
    <>
      <MultiStepLoginFormComponent />
      <Suspense fallback={<div>Loading...</div>}>{/* <ProjectCard /> */}</Suspense>
    </>
  );
}
export default App;
