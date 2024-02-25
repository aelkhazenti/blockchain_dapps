import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import {NextUIProvider} from "@nextui-org/react";
import Nav from "./components/navbar/navbar";
import CandidateCard from  "./components/card/card";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <Nav />        
          <CandidateCard />
      </main>
      <App />
    </NextUIProvider>
      
  </React.StrictMode>

);
