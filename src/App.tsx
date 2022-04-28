import React from "react";
import { TopPrints } from "./print/TopPrints";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <TopPrints />
      </Container>
    </div>
  );
}

export default App;
