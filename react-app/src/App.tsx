import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Accordion, AccordionItem, Card, Progress, Skeleton } from "@nextui-org/react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card className="w-[200px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"> */}
        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
        {/* </a> */}
      </header>
    </div>
  );
}

export default App;
