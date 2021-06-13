import React from "react";
import { Home, Items, Item } from "./containers";
import { BrowserRouter, Route } from "react-router-dom";
import config from './api/config'
config.firm()


function App() {
  return (

      <BrowserRouter>   
        <Route exact path="/" component={Home} />
        <Route exact path="/items" component={Items} />
        <Route exact path="/items/:id" component={Item} />
      </BrowserRouter>

  );
}

export default App;
