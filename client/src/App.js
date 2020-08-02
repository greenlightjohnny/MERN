import React from "react";
import AppNavbar from "./components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ShoppingList from "./components/ShoppingLIst";
import { Provider } from "react-redux";
import Store from "./store";
import ItemModal from "./components/itemModal";
import { Container } from "reactstrap";
function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
