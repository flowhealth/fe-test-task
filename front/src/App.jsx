import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Game from "./components/game/Game";
import Statistics from "./components/statistics/Statistics";

export const App = () => {
  return (
    <Router>
      <Container>
        <Route exact path="/" component={Game} />
        <Route exact path="/stats" component={Statistics} />
      </Container>
    </Router>
  )
}