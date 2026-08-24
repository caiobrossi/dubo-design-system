import React from "react";
import ReactDOM from "react-dom/client";
import * as Dubo from "dubo-design-system";
import "dubo-design-system/styles/figma-make.css";

function App() {
  const exportCount = Object.keys(Dubo).length;

  return (
    <Dubo.DuboProvider>
      <main
        style={{
          minHeight: "100vh",
          padding: 32,
          background: "var(--color-bg-page)",
          color: "var(--color-text-primary)",
        }}
      >
        <Dubo.Card style={{ maxWidth: 560 }}>
          <Dubo.CardHeader>
            <Dubo.CardTitle>Figma Make compatibility</Dubo.CardTitle>
            <Dubo.CardDescription>
              React {React.version}, Vite, {exportCount} package exports
            </Dubo.CardDescription>
          </Dubo.CardHeader>
          <Dubo.CardContent style={{ gap: 16 }}>
            <Dubo.Input label="Patient name" placeholder="Maria Silva" />
            <Dubo.Badge variant="success">Ready</Dubo.Badge>
          </Dubo.CardContent>
          <Dubo.CardFooter>
            <Dubo.Button>Continue</Dubo.Button>
            <Dubo.Button variant="outline">Cancel</Dubo.Button>
          </Dubo.CardFooter>
        </Dubo.Card>
        <Dubo.Toaster />
      </main>
    </Dubo.DuboProvider>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Missing #root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
