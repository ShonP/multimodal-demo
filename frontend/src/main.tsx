import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { CopilotProvider } from "@fluentai/react-copilot";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme} className="providers">
      <CopilotProvider mode="canvas" className="providers">
        <App />
      </CopilotProvider>
    </FluentProvider>
  </React.StrictMode>
);
